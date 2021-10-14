module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class News extends Model {}
  News.init(
    {
      account_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      title: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_news: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_guest: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_trending: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_event: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_happening: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
    },
    { sequelize },
  );
  News.associate = (models) => {
    // associations can be defined here
    // News.belongsTo(models.User, {foreignKey: 'created_by'});
    News.hasMany(models.NewsGallery, {
      as: 'newsGallery',
      foreignKey: 'news_id',
    });
  };

  return News;
};
