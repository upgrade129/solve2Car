const { Storage } = require('@google-cloud/storage');
const {
  GCLOUD_PROEJCT,
  GCLOUD_CLIENT_EMAIL,
  GCLOUD_PRIVATE_KEY,
  GCLOUD_BUCKET,
} = require('../config/default');

const storage = new Storage({
  projectId: GCLOUD_PROEJCT,
  credentials: {
    client_email: GCLOUD_CLIENT_EMAIL,
    private_key: GCLOUD_PRIVATE_KEY,
  },
});
const bucket = storage.bucket(GCLOUD_BUCKET);
module.exports = bucket;
