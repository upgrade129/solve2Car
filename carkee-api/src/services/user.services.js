const { User, UserDetails, UserOtherDetails, UserTransfer } = require('../models');

const { ResponseHandler } = require('../middleware/ResponseHandler');

const { Messages } = require('../helper/messages');

const message = new Messages();
const { PasswordHashing } = require('../helper/hashing');

const passwordObject = new PasswordHashing();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();
class UserServices {
  userLogin = async (req, res) => {
    try {
      const { email, password, account_id } = req.body;

      const userData = await User.findOne({
        where: { email, account_id },
      });
      if (!userData) {
        res.status(404).send(ResponseHandler.sendMessage(404, message.notRegistered));
      }
      const dbPassword = await passwordObject.passwordVerification(
        userData.password,
      );
      if (dbPassword !== password) {
        res.status(401).send(ResponseHandler.sendMessage(401, message.invalidPassword));
      }
      return userData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  userRegister = async (req, res) => {
    try {
      const { email, password, account_id, fullname, mobile_code, mobile } =
        req.body;
      const user = await User.create({
        email,
        password,
        account_id,
        is_vendor: 0,
      });
      if (!user) {
        return res
          .status(500)
          .send(ResponseHandler.sendMessage(500, 'Something went wrong'));
      }
      const user_id = user.id;
      await UserDetails.create({
        user_id,
        fullName: fullname,
        mobile,
        mobile_code,
      });
      await UserOtherDetails.create({ user_id });
      await UserTransfer.create({ user_id });
      const userData = User.findOne({
        where: { id: user_id },
        include: [
          {
            model: UserDetails,
            as: 'userDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserOtherDetails,
            as: 'userOtherDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserTransfer,
            as: 'userTransfer',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateProfileStep_1 = async (req) => {
    const {
      fullname,
      gender,
      mobile_code,
      mobile,
      birthday,
      add_1,
      add_2,
      country,
      postal_code,
      nric,
      img_profile,
      profession,
      company,
      user_id,
      annual_salary,
      unit_no,
    } = req.body;
    const userData = await UserDetails.findOne({
      where: { user_id },
    });
    if (img_profile !== false) {
      await file.deleteFile(userData.img_profile);
      userData.img_profile = img_profile;
    }

    userData.fullName = fullname;
    userData.gender = gender;
    userData.mobile_code = mobile_code;
    userData.mobile = mobile;
    userData.birthday = birthday;
    userData.add_1 = add_1;
    userData.add_2 = add_2;
    userData.country = country;
    userData.postal_code = postal_code;
    userData.nric = nric;
    userData.profession = profession;
    userData.company = company;
    userData.annual_salary = annual_salary;
    userData.unit_no = unit_no;
    await userData.save();
    return User.findOne({
      where: { id: user_id },
      include: [
        {
          model: UserDetails,
          as: 'userDetails',
          where: { user_id },
          required: false,
        },
        {
          model: UserOtherDetails,
          as: 'userOtherDetails',
          where: { user_id },
          required: false,
        },
        {
          model: UserTransfer,
          as: 'userTransfer',
          where: { user_id },
          required: false,
        },
      ],
    });
  };

  updateProfileStep_2 = async (req, res) => {
    try {
      const {
        chasis_number,
        plate_no,
        car_model,
        are_you_owner,
        registration_code,
        user_id,
      } = req.body;
      const userData = await UserOtherDetails.findOne({
        where: { user_id },
      });
      userData.chasis_number = chasis_number;
      userData.plate_no = plate_no;
      userData.car_model = car_model;
      userData.are_you_owner = are_you_owner;
      userData.registration_code = registration_code;
      userData.save();
      const userD = User.findOne({
        where: { id: user_id },
        include: [
          {
            model: UserDetails,
            as: 'userDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserOtherDetails,
            as: 'userOtherDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserTransfer,
            as: 'userTransfer',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userD;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateProfileStep_3 = async (req, res) => {
    try {
      const {
        telephone_number,
        telephone_code,
        contact_person,
        emergency_code,
        relationship,
        user_id,
      } = req.body;
      const userData = await UserOtherDetails.findOne({
        where: { user_id },
      });
      userData.telephone_number = telephone_number;
      userData.telephone_code = telephone_code;
      userData.contact_person = contact_person;
      userData.emergency_code = emergency_code;
      userData.relationship = relationship;
      userData.save();
      const userD = User.findOne({
        where: { id: user_id },
        include: [
          {
            model: UserDetails,
            as: 'userDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserOtherDetails,
            as: 'userOtherDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserTransfer,
            as: 'userTransfer',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userD;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateProfileStep_4 = async (req, res) => {
    try {
      const {
        transfer_number,
        transfer_banking_nickname,
        transfer_date,
        transfer_amount,
        transfer_screenshot,
        user_id,
      } = req.body;
      const userTransferData = await UserTransfer.findOne({
        where: { user_id },
      });
      if (transfer_screenshot !== false) {
        await file.deleteFile(userTransferData.transfer_screenshot);
        userTransferData.transfer_screenshot = transfer_screenshot;
      }
      userTransferData.transfer_number = transfer_number;
      userTransferData.transfer_banking_nickname = transfer_banking_nickname;
      userTransferData.transfer_date = transfer_date;
      userTransferData.transfer_amount = transfer_amount;
      await userTransferData.save();
      const userD = User.findOne({
        where: { id: user_id },
        include: [
          {
            model: UserDetails,
            as: 'userDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserOtherDetails,
            as: 'userOtherDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserTransfer,
            as: 'userTransfer',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userD;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updatePassword = async (req, res) => {
    try {
      const { password_new, password_current, user_id } = req.body;
      const userD = await User.findOne({ where: { id: user_id } });
      const dbPassword = await passwordObject.passwordVerification(userD.password);
      if (dbPassword !== password_current) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.invalidPassword));
      }
      userD.password = password_new;
      await userD.save();
      return userD;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  verifyPassword = async (req, res) => {
    try {
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  userInfo = async (req, res) => {
    try {
      const { user_id } = req.body;
      const userData = User.findOne({
        where: { id: user_id },
        include: [
          {
            model: UserDetails,
            as: 'userDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserOtherDetails,
            as: 'userOtherDetails',
            where: { user_id },
            required: false,
          },
          {
            model: UserTransfer,
            as: 'userTransfer',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userData;
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
      const { mobile_code, mobile, user_id } = req.body;
      const userData = await UserDetails.findOne({
        where: { user_id },
      });
      if (!userData) {
        return null;
      }
      userData.mobile_code = mobile_code;
      userData.mobile = mobile;
      userData.save();
      return userData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getAllUsers = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await User.count({
        where: { account_id: req.body.account_id },
      });
      const userData = await User.findAll({
        where: { account_id: req.body.account_id },
        offset,
        limit: pagesize,
      });
      return [userData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { UserServices };
