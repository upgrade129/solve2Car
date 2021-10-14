const validator = require('email-validator');
const validatePhoneNumber = require('validate-phone-number-node-js');
const { ResponseHandler } = require('./ResponseHandler');
const { Messages } = require('../helper/messages');
const { User, Account } = require('../models');

const message = new Messages();

class DataChecker {
  dataValidation = async (req, res, next) => {
    try {
      const {
        email,
        password,
        password_confirm,
        account_id = 1,
        fullname,
        mobile_code = process.env.DEFAULTCODE,
        mobile = process.env.DEFAULTMOBILE,
      } = req.body;
      if (
        !email ||
        !password ||
        !password_confirm ||
        !account_id ||
        !fullname ||
        !mobile_code ||
        !mobile
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      if (!validator.validate(email)) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.mailChecker));
      }
      if (!validatePhoneNumber.validate(mobile)) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.mobileChecker));
      }
      const account = await Account.findOne({
        where: { id: account_id },
      });
      if (!account) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.noAccount_id));
      }
      const foundUser = await User.findOne({
        where: { email },
      });
      if (foundUser) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.existedEmail));
      }
      return next();
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { DataChecker };
