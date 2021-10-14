const { ListService } = require('../services/list.services');

const { ResponseHandler } = require('../middleware/ResponseHandler');

const { Messages } = require('../helper/messages');

const message = new Messages();

const listService = new ListService();

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class ListController {
  add = async (req, res) => {
    try {
      const urlArr = [];
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const vendorData = await listService.getVendor(req, res);

      if (!vendorData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.vendorNotFound));
      }
      req.body.vendor_id = vendorData.id;
      if (req.files.length === 0) {
        req.body.filename = urlArr;
        const listData = await listService.add(req, res);
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, message.addList, listData));
      }
      req.files.map(async (e, i) => {
        const URL = await file.uploadMultipleFile(e);
        urlArr.push(URL);
        if (req.files.length === i + 1) {
          req.body.filename = urlArr;
          const listData = await listService.add(req, res);
          return res
            .status(200)
            .send(ResponseHandler.sendMessage(200, message.addList, listData));
        }
        // TODO: let us discuss this
        return undefined;
      });
      // TODO: what should we response
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  edit = async (req, res) => {
    try {
      const { title, content, status, list_id } = req.body;
      if (!title || !content || !status || !list_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const listData = await listService.edit(req, res);
      if (!listData) {
        return res
          .status(404)
          .send(ResponseHandler.sendMessage(404, message.invalidList));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateList, listData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  info = async (req, res) => {
    try {
      const { list_id } = req.query;
      if (!list_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const listData = await listService.info(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.listData, listData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  listAll = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const listData = await listService.listAll(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.listData, ...listData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  upload = async (req, res) => {
    try {
      const urlArr = [];
      const { list_id } = req.body;
      if (!list_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      req.files.map(async (e, i) => {
        const URL = await file.uploadMultipleFile(e);
        urlArr.push(URL);
        if (req.files.length === i + 1) {
          req.body.filename = urlArr;
          await listService.upload(req, res);
        }
        // TODO: let us discuss this
        return undefined;
      });
      // TODO: what should we response
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  replaceImage = async (req, res) => {
    try {
      const { image_id, list_id } = req.body;
      if (!image_id || !list_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const galleryData = await listService.replaceImage(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.replaceImage, galleryData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  setPrimary = async (req, res) => {
    try {
      const { list_id } = req.body;
      if (!list_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const listData = await listService.setPrimary(req, res);
      if (!listData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidList));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateList, listData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeList = async (req, res) => {
    try {
      const { list_id } = req.body;
      if (!list_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await listService.removeList(req, res);
      // TODO: let us discuss this
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  galleryDelete = async (req, res) => {
    try {
      const { list_id, image_id } = req.body;
      if (!list_id || !image_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await listService.galleryDelete(req, res);
      // TODO: let us discuss this
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  approved = async (req, res) => {
    try {
      const { status, list_id } = req.body;
      if (!status || !list_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const approvedData = await listService.approved(req, res);
      if (!approvedData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidList));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateList, approvedData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}

module.exports = { ListController };
