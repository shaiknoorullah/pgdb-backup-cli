import inquirer from 'inquirer';
import chalk from 'chalk';
import { backupContainer } from './commands/backup';
import { uploadToS3 } from './commands/upload';
import { downloadFromS3 } from './commands/download';
import { testContainer } from './commands/test';

import dotenv from 'dotenv';
dotenv.config();


const main = async () => {
  console.log(chalk.blue('Welcome to the PostgreSQL Docker Backup CLI!'));
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Backup Docker Container', value: 'backup' },
        { name: 'Upload Backup to S3', value: 'upload' },
        { name: 'Download Backup from S3', value: 'download' },
        { name: 'Test Downloaded Backup', value: 'test' },
      ],
    },
  ]);

  switch (action) {
    case 'backup':
      await backupContainer();
      break;
    case 'upload':
      await uploadToS3();
      break;
    case 'download':
      await downloadFromS3();
      break;
    case 'test':
      await testContainer();
      break;
    default:
      console.log(chalk.red('Invalid action.'));
  }
};

main().catch(error => {
  console.error(chalk.red('An error occurred:'), error);
});
