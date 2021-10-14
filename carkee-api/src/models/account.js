module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Account extends Model {}
  Account.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hash_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      prefix: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    { sequelize },
  );
  Account.associate = (models) => {
    Account.hasMany(models.User, { as: 'user', foreignKey: 'account_id' });
    // Account.hasMany(models.Banner, { as: 'banner', foreignKey: 'account_id' });
  };
  return Account;
};
