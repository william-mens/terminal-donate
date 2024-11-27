import chalk from 'chalk';
import { DonationOption } from '../types';


// Function to display the current campaign information
export const displayCampaign = (index: number,donationOptions:DonationOption[]) => {
    console.clear();
    const title = chalk.cyan(donationOptions[index].title);
    const description = donationOptions[index].description.toLocaleLowerCase();
    console.log(title);
    console.log(description);
    
    console.log('\nOptions:');
    console.log('n - Next campaign');
    console.log('p - Previous campaign');
    console.log('d - Donate to this campaign');
    console.log('q - Quit');
  }