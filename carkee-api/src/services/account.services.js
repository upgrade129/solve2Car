const { Account } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class AccountService {
  createAccount = async (req, res) => {
    try {
      const { name, address, description, contact_name, email, logo, prefix } =
        req.body;
      const accountData = await Account.create({
        name,
        address,
        description,
        contact_name,
        email,
        logo,
        prefix,
        status: 0,
      });
      return accountData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateAccount = async (req, res) => {
    try {
      const {
        name,
        address,
        description,
        contact_name,
        email,
        logo,
        prefix,
        account_id,
      } = req.body;
      const accountData = await Account.findOne({
        where: { id: account_id },
      });
      if (!accountData) {
        return null;
      }
      if (logo !== 'NA') {
        await file.deleteFile(accountData.logo);
        accountData.logo = logo;
      }
      accountData.name = name;
      accountData.address = address;
      accountData.description = description;
      accountData.contact_name = contact_name;
      accountData.email = email;
      accountData.prefix = prefix;

      await accountData.save();
      return accountData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await Account.count();
      const accountData = await Account.findAll({
        where: { offset, limit: pagesize },
      });
      return [accountData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeAccount = async (req, res) => {
    try {
      const { account_id } = req.body;
      const accountData = await Account.findOne({
        where: { id: account_id },
      });
      if (!accountData) return false;

      await file.deleteFile(accountData.logo);
      await Account.destroy({ where: { id: account_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { AccountService };
