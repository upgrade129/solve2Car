const { Ads } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class AdsService {
  create = async (req, res) => {
    try {
      const { name, description, link, filename, isBottom, user_id } = req.body;

      const adsData = await Ads.create({
        name,
        description,
        link,
        image: filename,
        isBottom,
        user_id,
      });
      return adsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      const { page, limit } = req.query;
      const adsData = await Ads.findAll({
        where: { user_id: req.body.user_id },
        limit: parseInt(limit, 10),
        offSet: parseInt((page - 1) * limit, 10),
      });
      const count = await Ads.count({
        where: { user_id: req.body.user_id },
      });
      return [adsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getById = async (req, res) => {
    try {
      const adsData = await Ads.findOne({ where: { id: req.query.id } });
      return adsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateisBottom = async (req, res) => {
    try {
      const { isBottom, Ads_id } = req.body;
      const adsData = await Ads.findOne({ where: { id: Ads_id } });
      if (!adsData) {
        return null;
      }
      adsData.isBottom = isBottom;
      await adsData.save();
      return adsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateAds = async (req, res) => {
    try {
      const { name, description, link, filename, isBottom, Ads_id } = req.body;
      const adsData = await Ads.findOne({ where: { id: Ads_id } });
      if (!adsData) {
        return null;
      }
      if (filename !== 'NA') {
        await file.deleteFile(adsData.image);
        adsData.image = filename;
      }
      adsData.name = name;
      adsData.description = description;
      adsData.link = link;
      adsData.isBottom = isBottom;
      await adsData.save();
      return adsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeAds = async (req, res) => {
    try {
      const adsData = await Ads.findOne({
        where: { id: req.body.Ads_id },
      });
      if (!adsData) return false;

      await file.deleteFile(adsData.image);
      await Ads.destroy({ where: { id: req.body.Ads_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { AdsService };
