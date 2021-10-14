const { NewsService } = require('../services/news.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const newsService = new NewsService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class NewsController {
  add = async (req, res) => {
    try {
      const { title, content, summary } = req.body;
      if (!title || !content || !summary) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;

      const newsData = await newsService.add(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.AddNews, newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateNews = async (req, res) => {
    try {
      const { title, content, summary, news_id } = req.body;
      if (!news_id || !title || !content || !summary) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;
      const updatedNews = await newsService.updateNews(req, res);
      if (updatedNews) {
        return res
          .status(200)
          .send(ResponseHandler.sendMessage(200, message.updatedNews, updatedNews));
      }
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, message.invalidNews, updatedNews));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  listNews = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.listNews(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.newsData, ...newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeNews = async (req, res) => {
    try {
      const { news_id } = req.body;
      if (!news_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await newsService.removeNews(req, res);
      return res.status(200).send(ResponseHandler.sendMessage(200, message.removeNews));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  trendingNews = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.trendingNews(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, ...newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  happeningNews = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.happeningNews(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, ...newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addGallery = async (req, res) => {
    try {
      const { news_id } = req.body;
      if (!news_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const urlArr = [];
      req.files.map(async (e, i) => {
        const URL = await file.uploadMultipleFile(e);
        urlArr.push(URL);
        if (req.files.length === i + 1) {
          req.body.filename = urlArr;
          const galleryData = await newsService.addGallery(req, res);
          if (!galleryData) {
            return res
              .status(200)
              .send(ResponseHandler.sendMessage(402, message.invalidNews));
          }
          return res
            .status(200)
            .send(
              ResponseHandler.sendMessage(200, message.addGallery, galleryData),
            );
        }
        // TODO:
        return undefined;
      });
      // TODO:
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateGallery = async (req, res) => {
    try {
      const { image_id, news_id } = req.body;
      if (!image_id || !news_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const galleryData = await newsService.updateGallery(req, res);
      if (!galleryData) {
        return res
          .status(404)
          .send(ResponseHandler.sendMessage(404, message.invalidNewsGallery));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updateGallery, galleryData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeGallery = async (req, res) => {
    try {
      const { image_id, news_id } = req.body;
      if (!image_id || !news_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const d = await newsService.removeGallery(req, res);
      if (!d) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidNews));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.removeGallery));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getGallery = async (req, res) => {
    try {
      const { news_id } = req.query;
      if (!news_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const galleryData = await newsService.getGallery(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.listGallery, galleryData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isHappeningNews = async (req, res) => {
    try {
      const { news_id, account_id } = req.body;
      if (!news_id || !account_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.isHappeningNews(req, res);
      if (!newsData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidNews, newsData));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updatedNews, newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isTrendingNews = async (req, res) => {
    try {
      const { news_id, account_id } = req.body;
      if (!news_id || !account_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.isTrendingNews(req, res);
      if (!newsData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidNews, newsData));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updatedNews, newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  isActiveNews = async (req, res) => {
    try {
      const { news_id, account_id } = req.body;
      if (!news_id || !account_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.isActiveNews(req, res);
      if (!newsData) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidNews, newsData));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.updatedNews, newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  view = async (req, res) => {
    try {
      const { news_id } = req.query;
      if (!news_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.view(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.newsData, newsData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getNews = async (req, res) => {
    try {
      const { news_string, page, pagesize } = req.query;
      if (!news_string || !page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const newsData = await newsService.getNews(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.newsData, ...newsData));
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
module.exports = { NewsController };
