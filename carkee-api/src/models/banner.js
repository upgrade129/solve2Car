module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Banner extends Model {}
  Banner.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'PENDING',
      },
    },
    { sequelize, timestamps: true },
  );

  // Banner.associate =  (models) => {
  //   // Banner.belongsTo(models.Account, { foreignKey: 'account_id', as: "account" });
  // };

  return Banner;
};
