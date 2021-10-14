const { BannerService } = require('../services/banner.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const bannerService = new BannerService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class BannerController {
  create = async (req, res) => {
    try {
      const { title, content, link } = req.body;
      if (!title || !content || !link || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;

      const bannerData = await bannerService.create(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.addBanner, bannerData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateBanner = async (req, res) => {
    try {
      const { title, content, link, banner_id } = req.body;
      if (!banner_id || !title || !content || !link) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;
      const updatedBanner = await bannerService.updateBanner(req, res);
      if (updatedBanner) {
        return res
          .status(200)
          .send(
            ResponseHandler.sendMessage(200, message.updateBanner, updatedBanner),
          );
      }
      return res
        .status(400)
        .send(
          ResponseHandler.sendMessage(400, message.invalidBanner, updatedBanner),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  list = async (req, res) => {
    try {
      const bannerData = await bannerService.list(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getBanner, bannerData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  viewBanner = async (req, res) => {
    try {
      const { banner_id } = req.query;
      if (!banner_id) {
        return res.status(400).send(ResponseHandler.sendMessage(400, message.bennerId));
      }
      const bannerData = await bannerService.viewBanner(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getBanner, bannerData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeBanner = async (req, res) => {
    try {
      const { banner_id } = req.body;
      if (!banner_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await bannerService.removeBanner(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.deleteBanner));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { BannerController };
