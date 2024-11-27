
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { donateCommandHandler } from './commands/donate';
import { randomBytes } from 'crypto';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();


 
const generateKey = function() {
  return randomBytes(16).toString('base64');
};

// Global cleanup logic
const cleanupOnExit = () => {
  console.log(chalk.yellow('\nCleaning up resources before exiting...'));
  console.log(chalk.green('Graceful shutdown complete.'));
  process.exit(0);
};

// Handle signals like Ctrl + C
process.on('SIGINT', () => {
  console.log(chalk.red('\nCaught SIGINT (Ctrl + C). Exiting...'));
  cleanupOnExit();
});

process.on('SIGTERM', () => {
  console.log(chalk.red('\nCaught SIGTERM. Exiting...'));
  cleanupOnExit();
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(chalk.red('Uncaught Exception:'), err);
  cleanupOnExit();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
  cleanupOnExit();
});

yargs(hideBin(process.argv))
  .command('terminal.donate', 'Initiate the donation process', {}, (argv) => {  
    const sessionID = generateKey();
    donateCommandHandler(sessionID); 
  })
  .demandCommand() // Ensure a command is provided
  .help() // Display help message for commands
  .argv;

 
