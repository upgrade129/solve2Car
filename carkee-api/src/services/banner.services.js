const { Banner } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class BannerService {
  create = async (req, res) => {
    try {
      const { title, content, link, image } = req.body;
      const bannerData = await Banner.create({
        title,
        content,
        link,
        image,
        status: 'ACTIVE',
      });
      return bannerData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateBanner = async (req, res) => {
    try {
      const { title, content, link, image, banner_id } = req.body;
      const bannerData = await Banner.findOne({
        where: { id: banner_id },
      });
      if (!bannerData) {
        return null;
      }
      if (image !== 'NA') {
        await file.deleteFile(bannerData.image);
        bannerData.image = image;
      }
      bannerData.title = title;
      bannerData.content = content;
      bannerData.link = link;
      await bannerData.save();
      return bannerData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      const bannerData = await Banner.findAll();
      return bannerData;
    } catch (error) {
      return res.send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  viewBanner = async (req, res) => {
    try {
      const { banner_id } = req.query;
      const bannerData = await Banner.findOne({
        where: { id: banner_id },
      });
      return bannerData;
    } catch (error) {
      return res.send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeBanner = async (req, res) => {
    try {
      const { banner_id } = req.body;
      const bannerData = await Banner.findOne({
        where: { id: banner_id },
      });
      if (!bannerData) return false;

      await file.deleteFile(bannerData.image);
      await Banner.destroy({ where: { id: banner_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { BannerService };
