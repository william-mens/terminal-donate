import chalk from 'chalk';

let cleanupCallbacks: (() => void)[] = [];

export const registerCleanupCallback = (callback: () => void) => {
  cleanupCallbacks.push(callback);
};

export const cleanupOnExit = () => {
  console.log(chalk.yellow('\nCleaning up resources...'));

  cleanupCallbacks.forEach((callback) => {
    try {
      callback();
    } catch (error) {
      console.error(chalk.red('Error during cleanup:'), error);
    }
  });

  console.log(chalk.green('Graceful shutdown complete.'));
  process.exit(0);
};

// Attach the global signal handlers
process.on('SIGINT', cleanupOnExit);
process.on('SIGTERM', cleanupOnExit);
process.on('exit', cleanupOnExit);
process.on('uncaughtException', (err) => {
  console.error(chalk.red('Uncaught Exception:', err));
  cleanupOnExit();
});
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:', promise, 'reason:', reason));
  cleanupOnExit();
});
