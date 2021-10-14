module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class ListGallery extends Model {}
  ListGallery.init(
    {
      filename: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
    },
    { sequelize },
  );
  // ListGallery.associate = function(models) {
  //     // associations can be defined here
  //     //ListGallery.belongsTo(models.List, {foreignKey: 'List_id'});

  // };

  return ListGallery;
};
