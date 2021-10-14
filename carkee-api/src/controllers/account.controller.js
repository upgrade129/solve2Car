const { AccountService } = require('../services/account.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const accountService = new AccountService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class AccountController {
  createAccount = async (req, res) => {
    try {
      const { name, address, description, contact_name, email } = req.body;
      if (!name || !address || !description || !contact_name || !email) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.logo = url;

      const accountData = await accountService.createAccount(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.addAccount, accountData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateAccount = async (req, res) => {
    try {
      const { name, address, description, contact_name, email, account_id } =
        req.body;
      if (
        !account_id ||
        !name ||
        !address ||
        !description ||
        !contact_name ||
        !email
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.logo = url;
      const updatedAccount = await accountService.updateAccount(req, res);
      if (updatedAccount) {
        return res
          .status(200)
          .send(
            ResponseHandler.sendMessage(200, message.updateAccount, updatedAccount),
          );
      }
      return res
        .status(400)
        .send(
          ResponseHandler.sendMessage(400, message.invalidAccount, updatedAccount),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      // const { account_id} = req.query;
      // if (!account_id) {
      // return res.status(400).send(ResponseHandler.sendMessage(400, message.bodyParams));
      // }
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const accountData = await accountService.list(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getAccount, ...accountData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeAccount = async (req, res) => {
    try {
      const { account_id } = req.body;
      if (!account_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await accountService.removeAccount(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.deleteAccount));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { AccountController };
