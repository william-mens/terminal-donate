import {validateCardNumber,validateCVV,validateExpiryMonth,validateExpiryYear} from '../utils/validation';
import { input,select,password,number } from '@inquirer/prompts';
import { SingleBar, Presets } from 'cli-progress';
import chalk from 'chalk';
import figlet from 'figlet';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import WebSocket from 'ws';
import path from 'path';
import open from 'open';
import { CheckoutRequest, ResponseSocket } from '../types';
import fs from 'fs';

export const getUserDetails = async () => {
    const fullName = await input({ message: 'Enter your name' });
    const email = await input({ message: 'Enter your email address' });
    const amount = await input({ message: 'Enter donation amount' });
    const narration = await input({ message: 'Enter narration' });
  
    return { fullName, email, amount, narration };
  };

  export const getPaymentDetails = async () => {

    const paymentMethod = await select({
      message: 'Select your preferred payment method',
      choices: [
        { name: 'Mobile Money', value: 'mobile_money' },
        { name: 'Card', value: 'card' },
      ],
    });
  
    if (paymentMethod === 'mobile_money') {
      const network = await select({
        message: 'Select your network',
        choices: [
          { name: 'MTN', value: 'MTN' },
          { name: 'AIRTELTIGO', value: 'AIRTELTIGO' },
          { name: 'VODAFONE', value: 'VODAFONE' },
        ],
      });
      const msisdn = await input({ message: 'Enter your phone number' });
  
      return { paymentMethod, network, msisdn };
    }
  
    const cardNumber = await input({ message: 'Enter your card number', validate: validateCardNumber });
    const cvv = await password({ message: 'Enter your CVV', validate: validateCVV });
    const expiryMonth = await number({
      message: 'Enter card expiry month (e.g., 01)',
      validate: validateExpiryMonth,
    });
    const expiryYear = await number({
      message: 'Enter card expiry year (e.g., 29)',
      validate: validateExpiryYear,
    });
  
    return { paymentMethod, network: 'CARD', cardNumber, cvv, expiryMonth, expiryYear };
  };

 export const createProgressBar = () => {
    return new SingleBar(
      {
        format: `${chalk.cyan('{bar}')}| {percentage}%`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
      },
      Presets.shades_classic
    );
  };
  

 export const prepareHtmlFilePath = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.join(__dirname, 'payerVerification.html');
  };

  export const handleSocketMessage = (message: WebSocket.Data, progressBar: SingleBar, filePath: string) => {
    try {
      const socketResponse: ResponseSocket = JSON.parse(message.toString());
  
      if (socketResponse.responseCode === 202) progressBar.update(50);
      if (socketResponse.responseCode === 203) handlePayerVerification(socketResponse, filePath, progressBar);
      if (socketResponse.responseCode === 201) handleSuccess(progressBar);
    } catch (error) {
      console.error(chalk.red('Payment failed:'), error);
      progressBar.stop();
    }
  };

  const handlePayerVerification = (socketResponse: ResponseSocket, filePath: string, progressBar: SingleBar) => {
    const decodedHTML = Buffer.from(socketResponse.data?.payerVerificationHtml, 'base64').toString('utf-8');
    fs.writeFileSync(filePath, decodedHTML, { encoding: 'utf-8' });
    open(filePath).catch((err) => console.error('Failed to open the file:', err));
    progressBar.update(80);
  };
  

  const handleSuccess = (progressBar: SingleBar) => {
    progressBar.update(100);
    progressBar.stop();
    displayStylishMessage('Payment Successful');
  };
  
  export const createWebSocketRequest = (fullRequest: CheckoutRequest, transactionReference: string) => {
    return {
      ...fullRequest,
      transactionReference,
      route: 'external',
      pan: fullRequest.cardNumber?.slice(0, 6),
    };
  };


 const displayStylishMessage = (message: string) => {
    console.log(
      chalk.green(
        figlet.textSync(message, { horizontalLayout: 'default', verticalLayout: 'default' })
      )
    );
  };
