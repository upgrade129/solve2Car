module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Item extends Model {}
  Item.init(
    {
      approved_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: 1,
      },
    },
    { sequelize },
  );
  Item.associate = (models) => {
    // associations can be defined here
    // Item.belongsTo(models.User, {foreignKey: 'user_id'});
    Item.hasMany(models.ItemGallery, {
      as: 'itemGallery',
      foreignKey: 'item_id',
    });
    Item.hasMany(models.ItemRedeem, {
      as: 'itemRedeem',
      foreignKey: 'item_id',
    });
  };

  return Item;
};
