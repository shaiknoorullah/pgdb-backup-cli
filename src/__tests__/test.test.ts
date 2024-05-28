import { expect } from 'chai';
import sinon from 'sinon';
import { testContainer } from '../commands/test';
import * as execa from 'execa';
import * as logger from '../utils/logger';

describe('testContainer', () => {
  let execaCommandStub: sinon.SinonStub;
  let logStub: sinon.SinonStub;

  beforeEach(() => {
    execaCommandStub = sinon.stub(execa, 'execaCommand').resolves({ stdout: 'container running' } as any);
    logStub = sinon.stub(logger, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should test the Docker container successfully', async () => {
    await testContainer();
    expect(execaCommandStub.calledOnceWith('docker load -i backup.tar && docker run -d --name test_postgres postgres_backup:latest')).to.be.true;
    expect(logStub.calledWith('Test container started:', 'container running')).to.be.true;
  });

  it('should handle errors during the test process', async () => {
    execaCommandStub.rejects(new Error('Test failed'));
    try {
      await testContainer();
    } catch (error) {
      expect(execaCommandStub.calledOnceWith('docker load -i backup.tar && docker run -d --name test_postgres postgres_backup:latest')).to.be.true;
      expect(logStub.calledWith('Error:', sinon.match.instanceOf(Error))).to.be.true;
    }
  });
});
