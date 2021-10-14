const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limit: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = multer;
