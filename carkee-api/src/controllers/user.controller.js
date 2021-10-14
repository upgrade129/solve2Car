const { UserServices } = require('../services/user.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { TokenJWT } = require('../middleware/authenticate');
const { Messages } = require('../helper/messages');
const { PasswordHashing } = require('../helper/hashing');

const message = new Messages();
const passwordObject = new PasswordHashing();
const userService = new UserServices();
const jwt = new TokenJWT();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class UserController {
  userLogin = async (req, res) => {
    try {
      const { email, account_id, password } = req.body;
      if (!email || !account_id || !password) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const userData = await userService.userLogin(req, res);
      // save data into req.body for updating token in user table through modal authenticate
      req.body = userData;
      const authData = await jwt.tokenCreation(req, res);
      return res.status(200).send(authData);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  userRegister = async (req, res) => {
    try {
      const {
        email,
        password,
        password_confirm,
        account_id,
        fullname,
        mobile_code = '+65',
        mobile,
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
      if (password !== password_confirm) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.passwordMissMatch));
      }
      // Create Password hash
      req.body.password = JSON.stringify(
        await passwordObject.createPasswordHash(password),
      );
      const userData = await userService.userRegister(req, res);
      // save data into req.body for updating token in user table through modal authenticate
      req.body = userData;
      const authData = await jwt.tokenCreation(req, res);
      return res.status(200).send(authData);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateProfile = async (req, res) => {
    try {
      const { step } = req.body;
      if (!step) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.stepNumber));
      }
      if (step === '1') {
        const url = await file.uploadSingleFile(req, res);
        req.body.img_profile = url;
        const userData = await userService.updateProfileStep_1(req, res);
        return res.status(200).send({
          statusCode: 200,
          message: message.updateData,
          data: userData,
        });
      }
      if (step === '2') {
        const userData = await userService.updateProfileStep_2(req, res);
        return res.status(200).send({
          statusCode: 200,
          message: message.updateData,
          data: userData,
        });
      }
      if (step === '3') {
        const userData = await userService.updateProfileStep_3(req, res);
        return res.status(200).send({
          statusCode: 200,
          message: message.updateData,
          data: userData,
        });
      }
      if (step === '4') {
        const url = await file.uploadSingleFile(req, res);
        req.body.transfer_screenshot = url;
        const UserTransferData = await userService.updateProfileStep_4(req, res);
        return res.status(200).send({
          statusCode: 200,
          message: message.updateData,
          data: UserTransferData,
        });
      }
      // TODO: to be implemented
      return res.status(500).send('Not Implemented');
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updatePassword = async (req, res) => {
    try {
      const { password_current, password_new, password_confirm } = req.body;
      if (!password_new || !password_current || !password_confirm) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      if (password_new !== password_confirm) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.passwordMissMatch));
      }
      req.body.password_new = JSON.stringify(
        await passwordObject.createPasswordHash(password_new),
      );
      await userService.updatePassword(req, res);
      return res
        .status(200)
        .send({ statusCode: 200, message: message.passwordUpdate });
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  verifyPassword = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  userInfo = async (req, res) => {
    try {
      const userInfo = await userService.userInfo(req, res);
      return res.status(200).send(ResponseHandler.sendMessage(200, message.userData, userInfo));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  redeemList = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  options = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateEmail = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateMobile = async (req, res) => {
    try {
      const { mobile_code, mobile } = req.body;
      if (!mobile_code || !mobile) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const userData = await userService.updateMobile(req, res);
      if (!userData) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(402, message.invalidUser));
      }
      return res.status(200).send({
        statusCode: 200,
        message: message.mobileChange,
        data: userData,
      });
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updatePersonalProfile = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendorProfile = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  uploadDoc = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getDoc = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVehicle = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const userData = await userService.getAllUsers(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.userList, ...userData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}

module.exports = { UserController };
