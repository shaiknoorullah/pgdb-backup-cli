import execa from 'execa';
import ora from 'ora';
import { log } from '../utils/logger';

export const testContainer = async () => {
  const spinner = ora('Testing downloaded backup...').start();
  try {
    const { stdout } = await execa.execaCommand(
      'docker load -i backup.tar && docker run -d --name test_postgres postgres_backup:latest'
    );
    log('Test container started:', stdout);
    spinner.succeed('Backup tested successfully. Container is running.');
  } catch (error) {
    spinner.fail('Failed to test backup.');
    log('Error:', error);
    throw error;
  }
};
