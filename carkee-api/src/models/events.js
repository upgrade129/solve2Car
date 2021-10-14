module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Events extends Model {}
  Events.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      is_closed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      event_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
      place: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      eventTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'PENDING',
      },
    },
    { sequelize, timestamps: true },
  );
  Events.associate = (models) => {
    // associations can be defined here
    // Events.belongsTo(models.User, {foreignKey: 'user_id'});
    Events.hasMany(models.EventsGallery, {
      foreignKey: 'event_id',
      as: 'galleries',
    });
    Events.belongsToMany(models.User, {
      foreignKey: 'event_id',
      as: 'attendees',
      through: 'EventAttendees',
    });
    Events.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'created',
    });
    // Events.hasMany(models.EventsGallery, {as: 'EventsGallery', foreignKey: 'Events_id'});
  };

  return Events;
};
