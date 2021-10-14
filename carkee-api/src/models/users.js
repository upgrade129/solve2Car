module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      password_reset_token: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      reset_code: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      pin_hash: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      userToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
      is_vendor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        default: true,
      },
    },
    { sequelize },
  );
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.UserDetails, {
      as: 'userDetails',
      foreignKey: 'user_id',
    });
    User.hasMany(models.UserOtherDetails, {
      as: 'userOtherDetails',
      foreignKey: 'user_id',
    });
    User.hasMany(models.UserTransfer, {
      as: 'userTransfer',
      foreignKey: 'user_id',
    });
    User.hasMany(models.News, { as: 'news', foreignKey: 'created_by' });
    User.hasMany(models.List, { as: 'list', foreignKey: 'user_id' });
    User.hasMany(models.Events, { as: 'events', foreignKey: 'created_by' });
    User.hasMany(models.Ads, { as: 'ads', foreignKey: 'user_id' });
    User.hasMany(models.Vendors, { as: 'vendors', foreignKey: 'user_id' });
    User.belongsToMany(models.Events, {
      as: 'attendees',
      foreignKey: 'user_id',
      through: 'EventAttendees',
    });
    User.belongsToMany(models.Roles, {
      foreignKey: 'user_id',
      as: 'roles',
      through: 'UserRole',
    });
  };

  return User;
};
