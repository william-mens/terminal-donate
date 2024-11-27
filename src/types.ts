type page = {
  transactionReference: string,
  checkoutUrl: string
}


export interface SpinnerOption {
  text: string,
  spinner: Spinner
}
export interface Spinner {
  interval: number,
  indent?:number,
  frames: string[]
}
export interface DonationOption {
    title: string;
    description: string;
  }

export interface RequestPaymentResponse {
   responseCode: number,
   responseMessage: string,
   data: page

}


export interface  CheckoutRequest {
  merchantProductId: string
  fullName: string
  email: string
  transflowId: string
  pageTitle: string
  msisdn?: string
  pageDescription?: string
  currency: string
  amount: string
  paymentMethod: string
  narration: string
  logo?: string
  cardNumber?:string ,
  cvv?: string ,
  pan?: string,
  expiryMonth?: number ,
  expiryYear?: number,

  failureRedirectUrl: string
  apiKey: string,
  network:string
}


export interface ResponseSocket {
  responseCode:number,
  responseMessage: string
  data: any
}



