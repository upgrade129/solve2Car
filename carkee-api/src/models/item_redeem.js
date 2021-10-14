module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class ItemRedeem extends Model {}
  ItemRedeem.init(
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

  //   ItemRedeem.associate =  (models) => {

  //   };

  return ItemRedeem;
};
