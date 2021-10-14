const bucket = require('./gcpBucket');
const { GCLOUD_BUCKET } = require('../config/default');
const uuidv1 = require('./uuid');

class FileUploader {
  uploadSingleFile = async (req) => {
    try {
      if (req.files[0] === undefined) {
        return 'NA';
      }
      const filename = `${uuidv1()}-${req.files[0].originalname}`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({ resumable: false });
      return new Promise((resolve, reject) => {
        blobStream.on('finish', async () => {
          const url = `https://storage.googleapis.com/${GCLOUD_BUCKET}/${blob.name}`;
          resolve(url);
        });
        blobStream.on('error', (err) => reject(err));
        blobStream.end(req.files[0].buffer);
      });
    } catch (error) {
      return new Error(error);
    }
  };

  uploadMultipleFile = async (fileData) => {
    try {
      const filename = `${uuidv1()}-${fileData.originalname}`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({ resumable: false });

      return new Promise((resolve, reject) => {
        blobStream.on('finish', async () => {
          const url = `https://storage.googleapis.com/${GCLOUD_BUCKET}/${blob.name}`;
          resolve(url);
        });
        blobStream.on('error', (err) => reject(err));
        blobStream.end(fileData.buffer);
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteFile = async (fileName) => {
    try {
      if (!fileName || fileName === undefined) return false;

      const array = fileName.split('/');
      const file = array[array.length - 1];
      await bucket.file(file).delete();
      return true;
    } catch (error) {
      return false;
    }
  };
}

module.exports = { FileUploader };
