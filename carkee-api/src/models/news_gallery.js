module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class NewsGallery extends Model {}
  NewsGallery.init(
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

  //   NewsGallery.associate = (models) => {
  //     // associations can be defined here
  //     // NewsGallery.belongsTo(models.News, {foreignKey: 'news_id'});
  //   };

  return NewsGallery;
};
