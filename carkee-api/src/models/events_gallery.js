module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class EventsGallery extends Model {}
  EventsGallery.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'APPROVED',
      },
    },
    { sequelize, timestamps: true },
  );
  EventsGallery.associate = (models) => {
    EventsGallery.belongsTo(models.Events, {
      foreignKey: 'event_id',
      as: 'event',
    });
  };

  return EventsGallery;
};
