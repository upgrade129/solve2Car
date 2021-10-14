const ResponseHandler = require('../middleware/ResponseHandler');

module.exports = {
  inquire: async (req, res) => {
    try {
      // TODO: to be implemented
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  },
};
