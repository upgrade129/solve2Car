const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();
module.exports = {
  secretKey: process.env.JWTSECRET,
  algorithm: process.env.ALGORITHM,
  tokenAlgo: process.env.TOKENALGO,
  expireIN: process.env.EXPIREIN, // expires in 24 hours
  // secretKey : 'vCVH6sAmpNWRRRIHCK7rdEa01lrEyrE3'
  pagesize: 4,
};
