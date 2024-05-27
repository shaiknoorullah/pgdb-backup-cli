import ora from 'ora';
import { downloadFile } from '../utils/aws';
import { log } from '../utils/logger';

export const downloadFromS3 = async () => {
  const spinner = ora('Downloading backup from S3...').start();
  try {
    await downloadFile('your-bucket-name', 'backup.tar', 'backup.tar');
    spinner.succeed('Backup downloaded from S3 successfully.');
  } catch (error) {
    spinner.fail('Failed to download backup from S3.');
    log('Error:', error);
    throw error;
  }
};
