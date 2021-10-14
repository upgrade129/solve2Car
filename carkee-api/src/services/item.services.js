const { Item, ItemGallery, ItemRedeem } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const messages = new Messages();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class ItemService {
  add = async (req, res) => {
    try {
      const { title, content, amount, filename, account_id, user_id } = req.body;
      let { limit } = req.body;
      if (limit === undefined) {
        limit = 1;
      }
      const item = await Item.create({
        title,
        content,
        limit,
        amount,
        user_id,
        account_id,
        is_primary: false,
      });
      const item_id = item.id;
      filename.map(async (e) => {
        await ItemGallery.create({ filename: e, item_id, status: 1 });
      });
      const itemData = await Item.findAll({
        where: { user_id },
        include: [{ model: ItemGallery, as: 'itemGallery', required: false }],
      });
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  edit = async (req, res) => {
    try {
      const { title, content, status, limit, amount, item_id, user_id } = req.body;
      const itemData = await Item.findOne({
        where: { id: item_id, user_id },
      });
      if (!itemData) {
        return null;
      }
      itemData.title = title;
      itemData.content = content;
      itemData.status = status;
      itemData.amount = amount;
      itemData.limit = limit;

      await itemData.save();
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  info = async (req, res) => {
    try {
      const { item_id } = req.query;
      const { user_id } = req.body;
      const itemData = await Item.findAll({
        where: { user_id, id: item_id },
        include: [{ model: ItemGallery, as: 'itemGallery', required: false }],
      });
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  itemAll = async (req, res) => {
    try {
      const { user_id } = req.body;
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await Item.count({ where: { user_id } });
      const itemData = await Item.findAll({
        where: { user_id },
        include: [{ model: ItemGallery, as: 'itemGallery', required: false }],
        offset,
        limit: pagesize,
      });
      return [itemData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  upload = async (req, res) => {
    try {
      const { item_id, filename, user_id } = req.body;
      const item = await Item.findOne({
        where: { id: item_id, user_id },
      });
      if (!item) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, messages.invalidItem));
      }
      filename.map(async (e, i) => {
        await ItemGallery.create({ filename: e, item_id, status: 1 });
        if (filename.length === i + 1) {
          const galleryData = await ItemGallery.findAll({
            where: { item_id },
          });
          return res
            .status(200)
            .send(
              ResponseHandler.sendMessage(200, messages.ItemGallery, galleryData),
            );
        }
        return undefined;
      });
      return undefined;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  replaceImage = async (req, res) => {
    try {
      const { image_id, item_id, user_id } = req.body;
      const item = await Item.findOne({
        where: { id: item_id, user_id },
      });
      if (!item) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, messages.invalidItem));
      }
      const itemGallery = await ItemGallery.findOne({
        where: { id: image_id, item_id },
      });
      if (!itemGallery) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, messages.invalidItemGallery));
      }
      await file.deleteFile(itemGallery.filename);

      itemGallery.save();
      return itemGallery;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  galleryDelete = async (req, res) => {
    try {
      const { image_id, item_id, user_id } = req.body;
      const item = await Item.findOne({
        where: { id: item_id, user_id },
      });
      if (!item) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, messages.invalidItem));
      }
      const itemGallery = await ItemGallery.findOne({
        where: { id: image_id, item_id },
      });
      if (!itemGallery) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, messages.invalidItemGallery));
      }
      await file.deleteFile(itemGallery.filename);
      await ItemGallery.destroy({ where: { id: image_id, item_id } });
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, messages.deleteImage));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeItem = async (req, res) => {
    try {
      const { item_id } = req.body;
      const itemGallery = await ItemGallery.findAll({
        where: { item_id },
      });
      itemGallery.map(async (e) => {
        await file.deleteFile(e.filename);
      });
      await Item.destroy({ where: { id: item_id } });
      await ItemGallery.destroy({ where: { item_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  setPrimary = async (req, res) => {
    try {
      const { item_id, user_id } = req.body;
      const item = Item();
      const d = item.findOne({ where: { user_id, id: item_id } });
      if (!d) {
        return null;
      }
      await Item.update({ is_primary: 0 }, { where: { user_id } });
      const itemData = await Item.findOne({
        where: { user_id, id: item_id },
      });
      if (itemData.is_primary === true) {
        itemData.is_primary = false;
      } else {
        itemData.is_primary = true;
      }
      await itemData.save();
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  approved = async (req, res) => {
    try {
      const { status, item_id, user_id } = req.body;
      const itemData = await Item.findOne({ where: { id: item_id } });
      if (!itemData) {
        return null;
      }
      itemData.status = status;
      itemData.approved_by = user_id;
      await itemData.save();
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addRedeem = async (req, res) => {
    try {
      const { title, content, item_id } = req.body;
      const redeemData = await ItemRedeem.create({
        title,
        content,
        item_id,
      });
      return redeemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateRedeem = async (req, res) => {
    try {
      const { title, content, item_id, redeem_id } = req.body;
      const redeemData = await ItemRedeem.findOne({
        where: { id: redeem_id, item_id },
      });
      if (!redeemData) {
        return null;
      }
      redeemData.title = title;
      redeemData.content = content;
      await redeemData.save();
      return redeemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getRedeemInfo = async (req, res) => {
    try {
      const { item_id, redeem_id } = req.query;
      const redeemData = await ItemRedeem.findOne({
        where: { id: redeem_id, item_id },
      });
      return redeemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getRedeem = async (req, res) => {
    try {
      const { item_id } = req.query;
      const redeemData = await ItemRedeem.findOne({ where: { item_id } });
      return redeemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  deleteRedeem = async (req, res) => {
    try {
      const { item_id, redeem_id } = req.body;
      await ItemRedeem.destroy({ where: { id: redeem_id, item_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  approvedRedeem = async (req, res) => {
    try {
      const { status, item_id, user_id, redeem_id } = req.body;
      const itemData = await ItemRedeem.findOne({
        where: { id: redeem_id, item_id },
      });
      if (!itemData) {
        return null;
      }
      itemData.status = status;
      itemData.approved_by = user_id;
      await itemData.save();
      return itemData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { ItemService };
