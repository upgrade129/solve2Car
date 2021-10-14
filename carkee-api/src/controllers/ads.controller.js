const { AdsService } = require('../services/ads.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const adsService = new AdsService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class AdsController {
  add = async (req, res) => {
    try {
      const { name, description, link, isBottom } = req.body;
      if (
        (!name || !description || !link || req.files.length === 0,
        isBottom === undefined)
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const adsData = await adsService.create(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.createads, adsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      const { page, limit } = req.query;
      if (!page) {
        req.query.page = 1;
      }
      if (!limit) {
        req.query.limit = 15;
      }
      const adsData = await adsService.list(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.createads, ...adsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getById = async (req, res) => {
    try {
      if (!req.query.id) {
        return res.status(400).send(ResponseHandler.sendMessage(400, message.noAds_id));
      }
      const adsData = await adsService.getById(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.createads, adsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateisBottom = async (req, res) => {
    try {
      const { isBottom, Ads_id } = req.body;
      if (isBottom === undefined || !Ads_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const updatedisBottom = await adsService.updateisBottom(req, res);
      if (updatedisBottom) {
        return res
          .status(200)
          .send(
            ResponseHandler.sendMessage(
              200,
              message.updateisBottom,

              updatedisBottom,
            ),
          );
      }
      return res
        .status(400)
        .send(
          ResponseHandler.sendMessage(400, message.invalidAds, updatedisBottom),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateAds = async (req, res) => {
    try {
      const { name, description, link, isBottom, Ads_id } = req.body;
      if (!name || !description || isBottom === undefined || !link || !Ads_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const updatedAds = await adsService.updateAds(req, res);
      if (updatedAds) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, message.updateAds, updatedAds));
      }
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, message.invalidAds, updatedAds));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeAds = async (req, res) => {
    try {
      if (!req.body.Ads_id) {
        return res.status(400).send(ResponseHandler.sendMessage(400, message.noAds_id));
      }
      await adsService.removeAds(req, res);
      return res.status(200).send(ResponseHandler.sendMessage(200, message.deleteAds));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { AdsController };
