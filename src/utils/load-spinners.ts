import ora from 'ora';
import chalk from 'chalk';
import readline from 'readline';
import { SpinnerOption } from '../types';

const text = `${chalk.red('Terminal donations')} `;

export const loadSpinners = async (option:SpinnerOption) => { 
  
    const spinner = ora(option).start();
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    spinner.stop();

  }
  