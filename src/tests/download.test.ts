import { expect } from 'chai';
import sinon from 'sinon';
import { downloadFromS3 } from '../commands/download';
import * as awsUtils from '../utils/aws';
import * as logger from '../utils/logger';

describe('downloadFromS3', () => {
  let downloadFileStub: sinon.SinonStub;
  let logStub: sinon.SinonStub;

  beforeEach(() => {
    downloadFileStub = sinon.stub(awsUtils, 'downloadFile').resolves();
    logStub = sinon.stub(logger, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should download the backup from S3 successfully', async () => {
    await downloadFromS3();
    expect(downloadFileStub.calledOnceWith('your-bucket-name', 'backup.tar', 'backup.tar')).to.be.true;
    expect(logStub.calledWith('Backup downloaded from S3 successfully.')).to.be.true;
  });

  it('should handle errors during the download process', async () => {
    downloadFileStub.rejects(new Error('Download failed'));
    try {
      await downloadFromS3();
    } catch (error) {
      expect(downloadFileStub.calledOnceWith('your-bucket-name', 'backup.tar', 'backup.tar')).to.be.true;
      expect(logStub.calledWith('Error:', sinon.match.instanceOf(Error))).to.be.true;
    }
  });
});
