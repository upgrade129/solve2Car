const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db-config')[env];

let seq;
if (config.use_env_variable) {
  seq = new Sequelize(process.env[config.use_env_variable], config);
} else {
  seq = new Sequelize(config.database, config.username, config.password, config);
}
const sequelize = seq;
const Account = require('./account')(sequelize, Sequelize.DataTypes);
const Ads = require('./ads')(sequelize, Sequelize.DataTypes);
const EventsGallery = require('./events_gallery')(sequelize, Sequelize.DataTypes);
const Events = require('./events')(sequelize, Sequelize.DataTypes);
const Item = require('./item')(sequelize, Sequelize.DataTypes);
const ItemRedeem = require('./item_redeem')(sequelize, Sequelize.DataTypes);
const ItemGallery = require('./item_gallery')(sequelize, Sequelize.DataTypes);
const ListGallery = require('./list_gallery')(sequelize, Sequelize.DataTypes);
const List = require('./list')(sequelize, Sequelize.DataTypes);
const News = require('./news')(sequelize, Sequelize.DataTypes);
const NewsGallery = require('./news_gallery')(sequelize, Sequelize.DataTypes);
const Roles = require('./roles')(sequelize, Sequelize.DataTypes);
const UserDetails = require('./user_details')(sequelize, Sequelize.DataTypes);
const UserOtherDetails = require('./user_other_details')(
  sequelize,
  Sequelize.DataTypes,
);
const UserTransfer = require('./user_transfer')(sequelize, Sequelize.DataTypes);
const User = require('./users')(sequelize, Sequelize.DataTypes);
const Vendors = require('./vendors')(sequelize, Sequelize.DataTypes);

const models = {
  Account,
  Ads,
  Events,
  EventsGallery,
  Item,
  ItemRedeem,
  ItemGallery,
  ListGallery,
  List,
  News,
  NewsGallery,
  Roles,
  UserDetails,
  UserOtherDetails,
  UserTransfer,
  User,
  Vendors,
};

Object.keys(models).forEach((name) => {
  if (models[name].associate) {
    models[name].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
