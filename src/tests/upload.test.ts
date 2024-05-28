import { expect } from 'chai';
import sinon from 'sinon';
import { uploadToS3 } from '../commands/upload';
import * as awsUtils from '../utils/aws';
import * as logger from '../utils/logger';

describe('uploadToS3', () => {
  let uploadFileStub: sinon.SinonStub;
  let logStub: sinon.SinonStub;

  beforeEach(() => {
    uploadFileStub = sinon.stub(awsUtils, 'uploadFile').resolves();
    logStub = sinon.stub(logger, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should upload the backup to S3 successfully', async () => {
    await uploadToS3();
    expect(uploadFileStub.calledOnceWith('backup.tar', 'your-bucket-name', 'backup.tar')).to.be.true;
    expect(logStub.calledWith('Backup uploaded to S3 successfully.')).to.be.true;
  });

  it('should handle errors during the upload process', async () => {
    uploadFileStub.rejects(new Error('Upload failed'));
    try {
      await uploadToS3();
    } catch (error) {
      expect(uploadFileStub.calledOnceWith('backup.tar', 'your-bucket-name', 'backup.tar')).to.be.true;
      expect(logStub.calledWith('Error:', sinon.match.instanceOf(Error))).to.be.true;
    }
  });
});
    