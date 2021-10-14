const { Events, EventsGallery } = require('../models');
const { ResponseHandler } = require('../middleware/ResponseHandler');

const { FileUploader } = require('../helper/file');

const file = new FileUploader();

class EventService {
  create = async (req, res) => {
    try {
      const {
        title,
        content,
        image,
        is_public,
        place,
        event_time,
        event_end,
        user_id,
        account_id,
        order = 0,
        is_paid = false,
        event_fee = 0,
      } = req.body;
      const eventData = Events.create({
        title,
        content,
        image,
        is_public,
        place,
        eventTime: event_time,
        eventEnd: event_end,
        created_by: user_id,
        account_id,
        order,
        is_paid,
        event_fee,
        status: 'PENDING',
      });
      return eventData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateEvent = async (req, res) => {
    try {
      const {
        title,
        content,
        image,
        is_public,
        place,
        event_time,
        event_end,
        summary,
        event_id,
        is_closed,
        order,
        limit,
        is_paid = false,
        event_fee = 0,
        user_id,
        account_id,
      } = req.body;
      const eventData = await Events.findOne({
        where: { id: event_id, created_by: user_id, account_id },
      });
      if (!eventData) {
        return null;
      }
      if (image !== 'NA') {
        await file.deleteFile(eventData.image);
        eventData.image = image;
      }
      eventData.title = title;
      eventData.content = content;
      eventData.is_public = is_public;
      eventData.place = place;
      eventData.eventTime = event_time;
      eventData.eventEnd = event_end;
      eventData.summary = summary;
      eventData.is_closed = is_closed;
      eventData.order = order;
      eventData.limit = limit;
      eventData.is_paid = is_paid;
      eventData.event_fee = event_fee;
      await eventData.save();
      return eventData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  removeEvent = async (req, res) => {
    try {
      const { event_id } = req.body;
      const EventData = await Events.findOne({ where: { id: event_id } });
      if (EventData) await file.deleteFile(EventData.image);
      const eventGallery = await EventsGallery.findAll({
        where: { event_id },
      });
      eventGallery.map(async (e) => {
        await file.deleteFile(e.filename);
      });
      await Events.destroy({ where: { id: event_id } });
      await EventsGallery.destroy({ where: { event_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  listEvent = async (req, res) => {
    try {
      let { page, pagesize } = req.query;
      page = parseInt(page, 10);
      pagesize = parseInt(pagesize, 10);
      const offset = page * pagesize;
      const count = await Events.count({
        where: { created_by: req.body.user_id },
      });
      const eventsData = await Events.findAll({
        where: { created_by: req.body.user_id },
        include: [{ model: EventsGallery, as: 'galleries', required: false }],
        offset,
        limit: pagesize,
      });
      return [eventsData, count];
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  view = async (req, res) => {
    try {
      const { event_id } = req.query;
      const eventsData = await Events.findAll({
        where: { id: event_id, created_by: req.body.user_id },
        include: [{ model: EventsGallery, as: 'galleries', required: false }],
      });
      return eventsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  addGallery = async (req, res) => {
    try {
      const { event_id, filename, user_id, account_id } = req.body;
      const eventData = await Events.findOne({
        where: { id: event_id, created_by: user_id, account_id },
      });
      if (!eventData) {
        return null;
      }
      filename.map(async (e) => {
        await EventsGallery.create({
          event_id,
          filename: e,
          is_primary: 0,
          status: 'PENDING',
        });
      });
      const galleryData = await EventsGallery.findAll({
        where: { event_id },
      });
      return galleryData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  updateGallery = async (req, res) => {
    try {
      const { image_id, event_id, filename } = req.body;
      const galleryD = await EventsGallery.findOne({
        where: { id: image_id, event_id },
      });
      if (!galleryD) {
        return null;
      }
      if (filename !== 'NA') {
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
      const { image_id, event_id } = req.body;
      const galleryD = await EventsGallery.findOne({
        where: { id: image_id, event_id },
      });
      if (!galleryD) {
        return false;
      }
      await file.deleteFile(galleryD.filename);
      await EventsGallery.destroy({ where: { id: image_id, event_id } });
      return true;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  getGallery = async (req, res) => {
    try {
      const { event_id } = req.query;
      const eventsData = await EventsGallery.findAll({
        where: { event_id },
      });
      return eventsData;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };
}

module.exports = { EventService };
