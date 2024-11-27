// donate.ts
import {loadSpinners} from '../utils/load-spinners';
import {ProcessPayment} from '../utils/checkout-payments';
import { CheckoutRequest, RequestPaymentResponse } from '../types';
import WebSocket from 'ws';
import Frames from '../utils/spinnerFrames';
import {getUserDetails,getPaymentDetails, createProgressBar, prepareHtmlFilePath, handleSocketMessage, createWebSocketRequest} from '../utils/paymentDetailHelpers';
import {config} from '../config'




export const paymentDetailHandler = async (campaignTitle:string) => {
    await loadSpinners(Frames.mainLoader);
    await paymentForm(campaignTitle);
 };



 const paymentForm = async (campaignTitle:string) => {

    process.on('SIGINT', () => {
        console.log('Donation process interrupted. Timer cleared.');
    });

  const userDetails = await getUserDetails();
  const paymentDetails = await getPaymentDetails();
  const fullRequest = createPaymentRequest(campaignTitle, userDetails, paymentDetails);

  const response =  await ProcessPayment(fullRequest);
  await loadSpinners(Frames.requestPaymentSpinner);
  await initiateSocketConnection(response,fullRequest);
    
 }

 const createPaymentRequest = (campaignTitle: string, userDetails: any, paymentDetails: any) => {
  const defaultPaymentRequest = {
    merchantProductId:config.merchantProductId,
    pageTitle: campaignTitle,
    transflowId: config.transflowId,
    currency: 'GHS',
    failureRedirectUrl: config.failureRedirectUrl,
    successRedirectUrl: config.successRedirectUrl,
    apiKey: config.checkoutApikey,
  };

  return { ...defaultPaymentRequest, ...userDetails, ...paymentDetails };
};


const initiateSocketConnection = async (response: RequestPaymentResponse, fullRequest: CheckoutRequest) => {
  const progressBar = createProgressBar();
  const filePath = prepareHtmlFilePath();

  const socketRequest = createWebSocketRequest(fullRequest, response.data.transactionReference);
  const ws = new WebSocket(config.webSocketUrl);

  ws.on('open', () => {
    ws.send(JSON.stringify(socketRequest), (err) => {
      if (err) console.error('Error sending data:', err);
    });
    progressBar.start(100, 0);
  });

  ws.on('message', (message) => handleSocketMessage(message, progressBar, filePath));
  ws.on('error', (error) => console.error('WebSocket error:', error));
  ws.on('close', () => console.log('Connection closed.'));
};