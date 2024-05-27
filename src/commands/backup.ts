import execa from 'execa';
import ora from 'ora';
import { log } from '../utils/logger';

export const backupContainer = async () => {
  const spinner = ora('Backing up Docker container...').start();
  try {
    const { stdout } = await execa.execaCommand(
      'docker commit postgres_container postgres_backup:latest'
    );
    log('Backup created:', stdout);
    spinner.succeed('Docker container backed up successfully.');
  } catch (error) {
    spinner.fail('Failed to backup Docker container.');
    log('Error:', error);
    throw error;
  }
};
