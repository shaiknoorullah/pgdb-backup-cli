import ora from 'ora';
import { uploadFile } from '../utils/aws';
import { log } from '../utils/logger';

export const uploadToS3 = async () => {
  const spinner = ora('Uploading backup to S3...').start();
  try {
    await uploadFile('backup.tar', 'your-bucket-name', 'backup.tar');
    spinner.succeed('Backup uploaded to S3 successfully.');
  } catch (error) {
    spinner.fail('Failed to upload backup to S3.');
    log('Error:', error);
    throw error;
  }
};
