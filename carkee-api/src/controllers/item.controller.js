const { ItemService } = require('../services/item.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const itemService = new ItemService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class ItemController {
  add = async (req, res) => {
    try {
      const urlArr = [];
      const { title, content, amount } = req.body;
      if (!title || !content || !amount) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      if (req.files.length === 0) {
        req.body.filename = urlArr;
        const itemData = await itemService.add(req, res);
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, message.addItem, itemData));
      }
      req.files.map(async (e, i) => {
        const URL = await file.uploadMultipleFile(e);
        urlArr.push(URL);
        if (req.files.length === i + 1) {
          req.body.filename = urlArr;
          const itemData = await itemService.add(req, res);
          return res
            .status(200)
            .send(ResponseHandler.sendMessage(200, message.addItem, itemData));
        }
        // TODO: what should we return
        return undefined;
      });
      // TODO: what should be the response here
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  edit = async (req, res) => {
    try {
      const { title, content, status, limit, amount, item_id } = req.body;
      if (!title || !content || !status || !item_id || !limit || !amount) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const itemData = await itemService.edit(req, res);
      if (!itemData) {
        return res
          .status(404)
          .send(ResponseHandler.sendMessage(404, message.invalidItem));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateItem, itemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  info = async (req, res) => {
    try {
      const { item_id } = req.query;
      if (!item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const itemData = await itemService.info(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.itemData, itemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  itemAll = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const itemData = await itemService.itemAll(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.itemData, ...itemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  upload = async (req, res) => {
    try {
      const urlArr = [];
      const { item_id } = req.body;
      if (!item_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }

      // TODO: The below code repeats many places. Let us refactor it
      //       Remember DRY (Don't repeat yourself) principle
      req.files.map(async (e, i) => {
        const URL = await file.uploadMultipleFile(e);
        urlArr.push(URL);
        if (req.files.length === i + 1) {
          req.body.filename = urlArr;
          await itemService.upload(req, res);
        }
        // TODO: what should we return
        return undefined;
      });
      // TODO: what should we return here
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  replaceImage = async (req, res) => {
    try {
      const { image_id, item_id } = req.body;
      if (!image_id || !item_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const galleryData = await itemService.replaceImage(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.replaceImage, galleryData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  galleryDelete = async (req, res) => {
    try {
      const { item_id, image_id } = req.body;
      if (!item_id || !image_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await itemService.galleryDelete(req, res);
      // TODO: what should we return
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeItem = async (req, res) => {
    try {
      const { item_id } = req.body;
      if (!item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await itemService.removeItem(req, res);
      // TODO: what should we return
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  setPrimary = async (req, res) => {
    try {
      const { item_id } = req.body;
      if (!item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const itemData = await itemService.setPrimary(req, res);
      if (!itemData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidItem));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateitem, itemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  approved = async (req, res) => {
    try {
      const { status, item_id } = req.body;
      if (!status || !item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const approvedData = await itemService.approved(req, res);
      if (!approvedData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidItem));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateItem, approvedData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addRedeem = async (req, res) => {
    try {
      const { title, content, item_id } = req.body;
      if (!title || !content || !item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const redeemData = await itemService.addRedeem(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.addRedeem, redeemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateRedeem = async (req, res) => {
    try {
      const { title, content, item_id, redeem_id } = req.body;
      if (!title || !content || !item_id || !redeem_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const redeemData = await itemService.updateRedeem(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateRedeem, redeemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getRedeemInfo = async (req, res) => {
    try {
      const { item_id, redeem_id } = req.query;
      if (!item_id || !redeem_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const redeemData = await itemService.getRedeemInfo(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getRedeem, redeemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getRedeem = async (req, res) => {
    try {
      const { item_id } = req.query;
      if (!item_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const redeemData = await itemService.getRedeem(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getRedeem, redeemData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  deleteRedeem = async (req, res) => {
    try {
      const { item_id, redeem_id } = req.body;
      if (!item_id || !redeem_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const d = await itemService.deleteRedeem(req, res);
      if (d) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, message.deleteRedeem));
      }
      // TODO:
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  approvedRedeem = async (req, res) => {
    try {
      const { status, item_id, redeem_id } = req.body;
      if (!status || !item_id || !redeem_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const approvedData = await itemService.approvedRedeem(req, res);
      if (!approvedData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidItem));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateItem, approvedData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}

module.exports = { ItemController };
