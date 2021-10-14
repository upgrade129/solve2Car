const crypto = require('crypto');
const config = require('../config/index');

const iv = crypto.randomBytes(16);
class PasswordHashing {
  createPasswordHash = async (passkey) => {
    const cipher = crypto.createCipheriv(config.algorithm, config.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(passkey), cipher.final()]);
    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  };

  passwordVerification = async (hash) => {
    const data = JSON.parse(hash);
    const decipher = crypto.createDecipheriv(
      config.algorithm,
      config.secretKey,
      Buffer.from(data.iv, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(data.content, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  };
}

module.exports = { PasswordHashing };
