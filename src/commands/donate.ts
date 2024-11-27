 import chalk from 'chalk';
 import {loadSpinners} from '../utils/load-spinners';
 import {displayCampaign} from '../utils/display-campaigns';
 import {paymentDetailHandler} from './paymentDetails';

 import readline from 'readline';
import { DonationOption } from '../types';
import {clearState} from '../states/terminal.state';
import Frames from '../utils/spinnerFrames';


export const donateCommandHandler = async (sessionID:string) => {
     await loadSpinners(Frames.mainLoader);
     await clearState(sessionID);
     await handleUserInput()
  };






// Define the donation options with title and description
const donationOptions:DonationOption[] = [
    {
     
    title: 'University of Ghana Medical Centre Ltd.', 
    description: `
    FUND-RAISER FOR IN-PATIENT CLINICAL TRIALS UNIT
    The UGMC has embraced the challenge of providing world-class health care to its clients - local and international.
    To achieve this goal, the Centre is establishing a state-of-the-art in-patient clinical trials unit (CTU),
    housing laboratories where clinical trials will be performed safely to international standards. 
    You may support the establishment of the Clinical Trials Unit by donating generously towards this worthy cause.
    `
    
    },
    { title: 'Health Fund', description: 'Provide medical aid to those in need.' }
  ];

  const handleUserInput = async () => {
    let currentIndex = 0; 
    displayCampaign(currentIndex, donationOptions); 

  
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    const handleKeyPress = async (key: string) => {
      switch (key) {
        case 'n': 
          currentIndex = (currentIndex + 1) % donationOptions.length;
          break;
        case 'p': 
          currentIndex = (currentIndex - 1 + donationOptions.length) % donationOptions.length;
          break;
        case 'd': 
          console.log(`You have selected to donate to: ${chalk.green(donationOptions[currentIndex].title)}`);
          const title = chalk.green(donationOptions[currentIndex].title);
          await paymentDetailHandler(title);
          rl.close(); 
          return;
        case 'q': 
          console.log('Exiting...');
          rl.close(); 
          return;
        default: // Invalid option
          console.log('Invalid option, please use n, p, d, or q.');
      }
      displayCampaign(currentIndex,donationOptions); // Display the updated campaign
    };
  
    rl.on('line', handleKeyPress);
  }


  