module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Ads extends Model {}
  Ads.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(265),
        allowNull: false,
      },
      isBottom: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
    },
    { sequelize },
  );
  Ads.associate = (models) => {
    // associations can be defined here
    Ads.belongsTo(models.User, { foreignKey: 'user_id' });
    // Ads.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' })
  };

  return Ads;
};
