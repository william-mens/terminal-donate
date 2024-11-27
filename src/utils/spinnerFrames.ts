import chalk from 'chalk';

const Frames =  {
     mainLoader: {
        text:  `${chalk.red('Terminal donations')}`,
        spinner: {
         interval: 80, 
         indent: 0,
         frames: [
           "،  ",
           "′  ",
           " ´ ",
           " ‾ ",
           "  ⸌",
           "  ⸊",
           "  |",
           "  ⁎",
           "  ⁕",
           " ෴ ",
           "  ⁓",
           "   ",
           "   ",
           "   "
         ],
       },
    },
    requestPaymentSpinner: {
        text:  `${chalk.red('we are on it....')} `,
        spinner: {
         interval: 80,
         frames: [
            "،  ",
            "′  ",
            " ´ ",
            " ‾ ",
            "  ⸌",
            "  ⸊",
            "  |",
            "  ⁎",
            "  ⁕",
            " ෴ ",
            "  ⁓",
            "   ",
            "   ",
            "   ",
          ],
       },
    }
}

export default Frames;



