import { CheckoutRequest } from "../types";
 
 
 export const ProcessPayment = async (request:CheckoutRequest) =>  {
    const url = 'https://apisuat.itcsrvc.com/checkout/request-payments';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Request failed: ${response.status} - ${error}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
 
  