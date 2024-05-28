import { expect } from 'chai';
import sinon from 'sinon';
import * as execa from 'execa';
import { backupContainer } from '../commands/backup';
import * as logger from '../utils/logger';

describe('backupContainer', () => {
  let execaCommandStub: sinon.SinonStub;
  let logStub: sinon.SinonStub;

  beforeEach(() => {
    execaCommandStub = sinon.stub(execa, 'execaCommand').resolves({ stdout: 'backup created' } as any);
    logStub = sinon.stub(logger, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should backup the Docker container successfully', async () => {
    await backupContainer();
    expect(execaCommandStub.calledOnceWith('docker commit postgres_container postgres_backup:latest')).to.be.true;
    expect(logStub.calledWith('Backup created:', 'backup created')).to.be.true;
  });

  it('should handle errors during the backup process', async () => {
    execaCommandStub.rejects(new Error('Backup failed'));
    try {
      await backupContainer();
    } catch (error) {
      expect(execaCommandStub.calledOnceWith('docker commit postgres_container postgres_backup:latest')).to.be.true;
      expect(logStub.calledWith('Error:', sinon.match.instanceOf(Error))).to.be.true;
    }
  });
});
