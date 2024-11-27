const luhnCheck = (cardNumber: string): boolean => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9; 
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0; // If divisible by 10, the card number is valid
  };
  

  export const validateCardNumber = (input: string): string | boolean => {
    const regex = /^[0-9]{13,19}$/; // Card number length varies, allow 13-19 digits
    if (!input.match(regex)) {
       return 'Card number must contain only digits and be between 13 to 19 digits long.';
    }
    if (!luhnCheck(input)) {
      return 'Card number is invalid (Luhn algorithm check failed).';
       
    }
    return true;
  };
  

  export const validateCVV = (input: string): string | boolean => {
    const regex = /^[0-9]{3,4}$/; // CVV is either 3 or 4 digits
    if (!input.match(regex)) {
      return 'CVV must be 3 or 4 digits long.';
    }
    return true;
  };

  export const validateExpiryMonth = (input: number | undefined): string | boolean => {
    if (!input) {
        return'Expiry month is required.';
       
      }
    
    const month = input;
    if (month < 1 || month > 12) {
      return'Expiry month must be between 01 and 12.';
  
    }
    return true;
  };
  
  export const validateExpiryYear = (input: number | undefined): string | boolean => {

    if (!input) {
         return  'Expiry month is required.';
      }
    const year = input;
    const currentYear = new Date().getFullYear() % 100;
    if (year < currentYear) {
      return 'Expiry year must be in the future.';
    }
    return true;
  };
  
  