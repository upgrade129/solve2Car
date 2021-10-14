module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class ItemGallery extends Model {}
  ItemGallery.init(
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
  // ItemGallery.associate = function(models) {
  //     // associations can be defined here
  //     //ItemGallery.belongsTo(models.Item, {foreignKey: 'Item_id'});

  // };

  return ItemGallery;
};
