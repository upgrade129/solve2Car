const { EventService } = require('../services/event.services');
const { ResponseHandler } = require('../middleware/ResponseHandler');
const { Messages } = require('../helper/messages');

const message = new Messages();

const eventService = new EventService();
const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class EventsController {
  create = async (req, res) => {
    try {
      const { title, content, is_public, place, event_time, event_end } = req.body;
      if (!title || !content || !is_public || !place || !event_time || !event_end) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;
      const eventData = await eventService.create(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.addEvent, eventData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateEvent = async (req, res) => {
    try {
      const {
        title,
        content,
        is_public,
        place,
        event_time,
        event_end,
        summary,
        event_id,
        is_closed,
        order,
        limit,
      } = req.body;
      if (
        !title ||
        !content ||
        !is_public ||
        !place ||
        !event_time ||
        !event_end ||
        !summary ||
        !event_id ||
        !is_closed ||
        !order ||
        !limit
      ) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.image = url;
      const updatedEvent = await eventService.updateEvent(req, res);
      if (updatedEvent) {
        return res
          .status(200)
          .send(
            ResponseHandler.sendMessage(200, message.updateEvent, updatedEvent),
          );
      }
      return res
        .status(400)
        .send(ResponseHandler.sendMessage(400, message.invalidEvent, updatedEvent));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeEvent = async (req, res) => {
    try {
      const { event_id } = req.body;
      if (!event_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      await eventService.removeEvent(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.deleteEvent));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  listEvent = async (req, res) => {
    try {
      const { page, pagesize } = req.query;
      if (!page || !pagesize) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const eventData = await eventService.listEvent(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getEvent, ...eventData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  view = async (req, res) => {
    try {
      const { event_id } = req.query;
      if (!event_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const eventData = await eventService.view(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getEvent, eventData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addGallery = async (req, res) => {
    try {
      const { event_id } = req.body;
      if (!event_id || req.files.length === 0) {
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
          const galleryData = await eventService.addGallery(req, res);
          if (!galleryData) {
            return res
              .status(200)
              .send(ResponseHandler.sendMessage(402, message.invalidEvent));
          }
          return res
            .status(200)
            .send(
              ResponseHandler.sendMessage(
                200,
                message.addEventGallery,

                galleryData,
              ),
            );
        }
        // TODO: what should be the response here
        return undefined;
      });

      // TODO: what should be the response here
      return res.status(200);
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateGallery = async (req, res) => {
    try {
      const { image_id, event_id } = req.body;
      if (!image_id || !event_id || req.files.length === 0) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const url = await file.uploadSingleFile(req, res);
      req.body.filename = url;
      const galleryData = await eventService.updateGallery(req, res);
      if (!galleryData) {
        return res
          .status(404)
          .send(ResponseHandler.sendMessage(404, message.invalidEventGallery));
      }
      return res
        .status(200)
        .send(
          ResponseHandler.sendMessage(200, message.updateEventGallery, galleryData),
        );
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeGallery = async (req, res) => {
    try {
      const { image_id, event_id } = req.body;
      if (!image_id || !event_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const d = await eventService.removeGallery(req, res);
      if (!d) {
        return res
          .status(402)
          .send(ResponseHandler.sendMessage(402, message.invalidEvent));
      }
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.removeEventGallery));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getGallery = async (req, res) => {
    try {
      const { event_id } = req.query;
      if (!event_id) {
        return res
          .status(400)
          .send(ResponseHandler.sendMessage(400, message.bodyParams));
      }
      const eventData = await eventService.getGallery(req, res);
      return res
        .status(200)
        .send(ResponseHandler.sendMessage(200, message.getEventGallery, eventData));
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}

module.exports = { EventsController };
