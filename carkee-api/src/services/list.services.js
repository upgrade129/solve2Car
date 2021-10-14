const { List, Vendors, ListGallery } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { Messages } = require('../helper/messages');

const messages = new Messages();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class ListService {
  add = async (req) => {
    const { title, content, filename, account_id, user_id, vendor_id } = req.body;
    const list = await List.create({
      title,
      content,
      user_id,
      account_id,
      is_primary: false,
      vendor_id,
    });
    const list_id = list.id;
    filename.map(async (e) => {
      await ListGallery.create({ filename: e, list_id, status: 1 });
    });
    return List.findAll({
      where: { user_id },
      include: [
        { model: ListGallery, as: 'listGallery', required: false },
        { model: Vendors, as: 'vendor', where: { user_id }, required: false },
      ],
    });
  };

  edit = async (req) => {
    const { title, content, status, list_id, user_id } = req.body;
    const listData = await List.findOne({
      where: { id: list_id, user_id },
    });
    if (!listData) {
      return null;
    }
    listData.title = title;
    listData.content = content;
    listData.status = status;
    await listData.save();
    return listData;
  };

  info = async (req) => {
    const { list_id } = req.query;
    const { user_id } = req.body;
    return List.findAll({
      where: { user_id, id: list_id },
      include: [
        { model: Vendors, as: 'vendor', required: false },
        { model: ListGallery, as: 'listGallery', required: false },
      ],
    });
  };

  listAll = async (req) => {
    const { user_id } = req.body;
    let { page, pagesize } = req.query;
    page = parseInt(page, 10);
    pagesize = parseInt(pagesize, 10);
    const offset = page * pagesize;
    const count = await List.count({ where: { user_id } });
    const listData = await List.findAll({
      where: { user_id },
      include: [
        { model: ListGallery, as: 'listGallery', required: false },
        { model: Vendors, as: 'vendor', required: false },
      ],
      offset,
      limit: pagesize,
    });
    return [listData, count];
  };

  upload = async (req, res) => {
    const { list_id, filename, user_id } = req.body;
    const list = await List.findOne({
      where: { id: list_id, user_id },
    });
    if (!list) {
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, messages.invalidList));
    }
    filename.map(async (e, i) => {
      await ListGallery.create({ filename: e, list_id, status: 1 });
      if (filename.length === i + 1) {
        const galleryData = await ListGallery.findAll({
          where: { list_id },
        });
        return res.status(200).send({
          statusCode: 200,
          message: messages.listGallery,
          data: galleryData,
        });
      }
      return undefined;
    });
    return undefined;
  };

  replaceImage = async (req, res) => {
    const { image_id, list_id, filename, user_id } = req.body;
    const list = await List.findOne({
      where: { id: list_id, user_id },
    });
    if (!list) {
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, messages.invalidList));
    }
    const listGallery = await ListGallery.findOne({
      where: { id: image_id, list_id },
    });
    if (!listGallery) {
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, messages.invalidListGallery));
    }
    await file.deleteFile(listGallery.filename);
    listGallery.filename = filename;
    listGallery.save();
    return listGallery;
  };

  setPrimary = async (req) => {
    const { list_id, user_id } = req.body;
    const d = List.findOne({ where: { user_id, id: list_id } });
    if (!d) {
      return null;
    }
    await List.update({ is_primary: 0 }, { where: { user_id } });
    const listData = await List.findOne({
      where: { user_id, id: list_id },
    });
    if (listData.is_primary === true) {
      listData.is_primary = false;
    } else {
      listData.is_primary = true;
    }
    await listData.save();
    return listData;
  };

  removeList = async (req) => {
    const { list_id } = req.body;
    const listGallery = await ListGallery.findAll({
      where: { list_id },
    });
    listGallery.map(async (e) => {
      await file.deleteFile(e.filename);
    });
    await List.destroy({ where: { id: list_id } });
    await ListGallery.destroy({ where: { list_id } });
    return true;
  };

  galleryDelete = async (req, res) => {
    const { image_id, list_id, user_id } = req.body;
    const list = await List.findOne({
      where: { id: list_id, user_id },
    });
    if (!list) {
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, messages.invalidList));
    }
    const listGallery = await ListGallery.findOne({
      where: { id: image_id, list_id },
    });
    if (!listGallery) {
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, messages.invalidListGallery));
    }
    await file.deleteFile(listGallery.filename);
    await ListGallery.destroy({ where: { id: image_id, list_id } });
    return res
      .status(400)
      .send(ResponseHandler.sendMessage(400, messages.deleteImage));
  };

  approved = async (req) => {
    const { status, list_id, user_id } = req.body;
    const listData = await List.findOne({ where: { id: list_id } });
    if (!listData) {
      return null;
    }
    listData.status = status;
    listData.approved_by = user_id;
    await listData.save();
    return listData;
  };

  getVendor = async (req) => {
    const { user_id } = req.body;
    return Vendors.findOne({
      where: {
        user_id,
      },
    });
  };
}
module.exports = { ListService };
