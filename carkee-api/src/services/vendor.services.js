const {
  Vendors,
  User,
  UserDetails,
  UserOtherDetails,
  UserTransfer,
} = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class VendorService {
  registration = async (req, res) => {
    try {
      const {
        email,
        password,
        vendor_name,
        account_id = 1,
        fullname,
        mobile_code = +65,
        mobile = 0,
        step,
      } = req.body;
      const user = await User.create({
        email,
        password,
        account_id,
        is_vendor: 1,
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
      await Vendors.create({ user_id, vendor_name, step });
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
          {
            model: Vendors,
            as: 'vendors',
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

  list = async (req, res) => {
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
          {
            model: Vendors,
            as: 'vendors',
            where: { user_id },
            required: false,
          },
        ],
      });
      return userData;
    } catch (error) {
      return res.send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor1 = async (req, res) => {
    try {
      const {
        gender,
        birthday,
        nric,
        vendor_name,
        about,
        company_employees,
        company_uen,
        user_id,
        step,
        vendor_id,
        company_email,
      } = req.body;
      const vendorData = await Vendors.findOne({
        where: { id: vendor_id },
      });
      if (!vendorData) {
        await Vendors.create({
          vendor_name,
          company_employees,
          company_uen,
          company_email,
          user_id,
          step,
        });
      } else {
        vendorData.vendor_name = vendor_name;
        vendorData.about = about;
        vendorData.company_employees = company_employees;
        vendorData.company_uen = company_uen;
        vendorData.step = step;
        vendorData.company_email = company_email;
        await vendorData.save();
      }
      const userDetails = await UserDetails.findOne({
        where: { user_id },
      });
      if (!userDetails) {
        await userDetails.create({
          user_id,
          gender,
          birthday,
          nric,
        });
      } else {
        userDetails.gender = gender;
        userDetails.birthday = birthday;
        userDetails.nric = nric;
        await userDetails.save();
      }
      const vendorDetails = await Vendors.findOne({
        where: { id: vendor_id },
      });
      return vendorDetails;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor2 = async (req, res) => {
    try {
      const { transfer_screenshot, user_id, step, vendor_id } = req.body;
      const userTransferData = await UserTransfer.findOne({
        where: { user_id },
      });
      const vendorData = await Vendors.findOne({
        where: { id: vendor_id },
      });
      if (!userTransferData) {
        await UserTransfer.create({
          transfer_screenshot,
          user_id,
          step,
        });
      } else {
        await file.deleteFile(userTransferData.transfer_screenshot);
        userTransferData.transfer_screenshot = transfer_screenshot;
        vendorData.step = step;
        await vendorData.save();
        await userTransferData.save();
      }
      const vendorDetails = await Vendors.findOne({
        where: { id: vendor_id },
      });
      return vendorDetails;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateVendor3 = async (req, res) => {
    try {
      const { company_logo, user_id, step, vendor_id } = req.body;
      const vendorsData = await Vendors.findOne({
        where: { id: vendor_id },
      });
      if (!vendorsData) {
        await Vendors.create({ company_logo, user_id, step });
      } else {
        await file.deleteFile(vendorsData.company_logo);
        vendorsData.company_logo = company_logo;
        vendorsData.step = step;
        await vendorsData.save();
      }
      const vendorDetails = await Vendors.findOne({
        where: { id: vendor_id },
      });
      return vendorDetails;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getAllVendors = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await Vendors.count();
      const vendorData = await Vendors.findAll({
        offset,
        limit: pagesize,
      });
      return [vendorData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  viewVendor = async (req, res) => {
    try {
      const { vendor_id } = req.query;
      const vendorData = await Vendors.findOne({
        where: { id: vendor_id },
      });
      return vendorData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  remove = async (req, res) => {
    try {
      const { vendor_id } = req.body;
      const vendorData = await Vendors.findOne({
        where: { id: vendor_id },
      });
      if (!vendorData) return false;
      await UserDetails.destroy({ where: { user_id: vendorData.user_id } });
      await UserOtherDetails.destroy({ where: { user_id: vendorData.user_id } });
      await UserTransfer.destroy({ where: { user_id: vendorData.user_id } });
      await file.deleteFile(vendorData.company_logo);
      await Vendors.destroy({ where: { id: vendor_id } });
      await User.destroy({ where: { id: vendorData.user_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { VendorService };
