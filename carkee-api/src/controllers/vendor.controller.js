const { VendorService } = require('../services/vendor.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');
const { PasswordHashing } = require('../helper/hashing');
const { TokenJWT } = require('../middleware/authenticate');

const jwt = new TokenJWT();
const message = new Messages();

const vendorService = new VendorService();
const passwordObject = new PasswordHashing();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class VendorController {
  registration = async (req, res) => {
    try {
      const {
        email,
        password,
        password_confirm,
        fullname,
        vendor_name,
        account_id,
        step,
      } = req.body;
      if (
        !email ||
        !password ||
        !vendor_name ||
        !password_confirm ||
        !fullname ||
        !vendor_name ||
        !account_id ||
        !step
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      if (password !== password_confirm) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.passwordMissMatch));
      }
      // Create Password hash
      req.body.password = JSON.stringify(
        await passwordObject.createPasswordHash(password),
      );
      const userData = await vendorService.registration(req, res);
      // save data into req.body for updating token in user table through modal authenticate
      req.body = userData;
      const authData = await jwt.tokenCreation(req, res);
      authData.step = 1;
      authData.vendor_id = userData.vendors[0].id;
      return res.status(200).send(authData);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      const vendorData = await vendorService.list(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getVendor, vendorData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor_1 = async (req, res) => {
    try {
      const {
        gender,
        birthday,
        nric,
        vendor_name,
        about,
        company_employees,
        company_uen,
        step,
        vendor_id,
        company_email,
      } = req.body;
      if (
        !vendor_name ||
        !gender ||
        !about ||
        !birthday ||
        !nric ||
        !company_employees ||
        !company_uen ||
        !company_email ||
        !step ||
        !vendor_id
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const updatedVendor = await vendorService.updateVendor1(req, res);
      return res
        .status(200)
        .send(
          ResponseHandler.sendMessage(200, message.updateVendor, updatedVendor),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor_2 = async (req, res) => {
    try {
      if (req.files.length === 0 || !req.body.step || !req.body.vendor_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.transfer_screenshot = url;
      const updatedVendor = await vendorService.updateVendor2(req, res);
      return res
        .status(200)
        .send(
          ResponseHandler.sendMessage(200, message.updateVendor, updatedVendor),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor_3 = async (req, res) => {
    try {
      if (req.files.length === 0 || !req.body.step || !req.body.vendor_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.company_logo = url;
      const updatedVendor = await vendorService.updateVendor3(req, res);
      return res
        .status(200)
        .send(
          ResponseHandler.sendMessage(200, message.updateVendor, updatedVendor),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getAllVendors = async (req, res) => {
    try {
      const vendorData = await vendorService.getAllVendors(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getVendor, ...vendorData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  viewVendor = async (req, res) => {
    try {
      const { vendor_id } = req.query;
      if (!vendor_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const vendorData = await vendorService.viewVendor(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getVendor, vendorData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeVendor = async (req, res) => {
    try {
      const { vendor_id } = req.body;
      if (!vendor_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await vendorService.remove(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.deleteVendor));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { VendorController };
