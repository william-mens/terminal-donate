import select, { Separator } from '@inquirer/select';

export const displayCampaigns = async() => {


const answer = await select({
    message: 'Select a campaign to make donation',
    choices: [
      {
        name: 'University of Ghana Medical Centre Ltd',
        value: 'FUND-RAISER FOR IN-PATIENT CLINICAL TRIALS UNIT',
        description: 'The UGMC has embraced the challenge of providing world-class health care to its clients- local and international.',
      }     
    ],
  });

 return answer;
}