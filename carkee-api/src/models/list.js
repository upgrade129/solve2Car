module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class List extends Model {}
  List.init(
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
  List.associate = (models) => {
    // associations can be defined here
    List.belongsTo(models.Vendors, { as: 'vendor', foreignKey: 'vendor_id' });
    List.hasMany(models.ListGallery, {
      as: 'listGallery',
      foreignKey: 'list_id',
    });
  };

  return List;
};
