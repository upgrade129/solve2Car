const { Op } = require('sequelize');
const { News, NewsGallery } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();
class NewsService {
  add = async (req, res) => {
    try {
      const { title, content, summary, image, account_id, user_id } = req.body;
      const newsData = await News.create({
        title,
        content,
        summary,
        image,
        created_by: user_id,
        account_id,
      });
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateNews = async (req, res) => {
    try {
      const { title, content, summary, image, news_id, user_id, account_id } =
        req.body;
      const newsData = await News.findOne({
        where: { id: news_id, created_by: user_id, account_id },
      });
      if (!newsData) {
        return null;
      }
      if (image !== 'NA') {
        await file.deleteFile(newsData.image);
        newsData.image = image;
      }
      newsData.title = title;
      newsData.content = content;
      newsData.summary = summary;
      await newsData.save();
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  listNews = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await News.count({
        where: { created_by: req.body.user_id },
      });
      const newsData = await News.findAll({
        where: { created_by: req.body.user_id },
        include: [{ model: NewsGallery, as: 'newsGallery', required: false }],
        offset,
        limit: pagesize,
      });
      return [newsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeNews = async (req, res) => {
    try {
      const { news_id } = req.body;
      const newsData = await News.findOne({ where: { id: news_id } });
      if (newsData) await file.deleteFile(newsData.image);
      const newsGallery = await NewsGallery.findAll({
        where: { news_id },
      });
      newsGallery.map(async (e) => {
        await file.deleteFile(e.filename);
      });
      await News.destroy({ where: { id: news_id } });
      await NewsGallery.destroy({ where: { news_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  trendingNews = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await News.count({
        where: { created_by: req.body.user_id },
      });
      const newsData = await News.findAll({
        where: { created_by: req.body.user_id, is_trending: true },
        offset,
        limit: pagesize,
      });
      return [newsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  happeningNews = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await News.count({
        where: { created_by: req.body.user_id },
      });
      const newsData = await News.findAll({
        where: { created_by: req.body.user_id, is_happening: 1 },
        offset,
        limit: pagesize,
      });
      return [newsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addGallery = async (req, res) => {
    try {
      const { news_id, filename, user_id, account_id } = req.body;
      const newsData = await News.findOne({
        where: { id: news_id, created_by: user_id, account_id },
      });
      if (!newsData) {
        return null;
      }
      filename.map(async (e) => {
        await NewsGallery.create({ news_id, filename: e });
      });
      const galleryData = await NewsGallery.findAll({
        where: { news_id },
      });
      return galleryData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateGallery = async (req, res) => {
    try {
      const { image_id, news_id, filename } = req.body;
      const galleryD = await NewsGallery.findOne({
        where: { id: image_id, news_id },
      });
      if (filename !== false) {
        await file.deleteFile(galleryD.filename);
        galleryD.filename = filename;
      }
      await galleryD.save();
      return galleryD;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeGallery = async (req, res) => {
    try {
      const { image_id, news_id } = req.body;
      const galleryD = await NewsGallery.findOne({
        where: { id: image_id, news_id },
      });
      if (!galleryD) {
        return false;
      }
      await file.deleteFile(galleryD.filename);
      await NewsGallery.destroy({ where: { id: image_id, news_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getGallery = async (req, res) => {
    try {
      const newsGallery = await NewsGallery.findAll({
        where: { news_id: req.query.news_id },
      });
      return newsGallery;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isHappeningNews = async (req, res) => {
    try {
      const newsData = await News.findOne({
        where: { account_id: req.body.account_id, id: req.body.news_id },
      });
      if (!newsData) {
        return null;
      }
      if (newsData.is_happening === true) {
        newsData.is_happening = false;
      } else {
        newsData.is_happening = true;
      }
      newsData.save();
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isTrendingNews = async (req, res) => {
    try {
      const newsData = await News.findOne({
        where: { account_id: req.body.account_id, id: req.body.news_id },
      });
      if (!newsData) {
        return null;
      }
      if (newsData.is_trending === true) {
        newsData.is_trending = false;
      } else {
        newsData.is_trending = true;
      }

      newsData.save();
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isActiveNews = async (req, res) => {
    try {
      const newsData = await News.findOne({
        where: { account_id: req.body.account_id, id: req.body.news_id },
      });
      if (!newsData) {
        return null;
      }
      if (newsData.status === true) {
        newsData.status = false;
      } else {
        newsData.status = true;
      }

      newsData.save();
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  view = async (req, res) => {
    try {
      const { news_id } = req.query;
      const newsData = await News.findAll({
        where: { account_id: req.body.account_id, id: news_id },
        include: [{ model: NewsGallery, as: 'newsGallery', required: false }],
      });
      return newsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getNews = async (req, res) => {
    try {
      const { news_string } = req.query;
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const filter_criteria = {
        where: {
          account_id: req.body.account_id,
          [Op.or]: [
            { title: { [Op.substring]: news_string } },
            { summary: { [Op.substring]: news_string } },
          ],
        },
        offset,
        limit: pagesize,
      };
      const count = await News.count(filter_criteria);
      const newsData = await News.findAll({
        ...filter_criteria,
        include: [{ model: NewsGallery, as: 'newsGallery', required: false }],
        offset,
        limit: pagesize,
      });
      return [newsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  trending = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  happening = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  news = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  guest = async (req, res) => {
    try {
      // TODO:
      return res.status(500);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}
module.exports = { NewsService };
