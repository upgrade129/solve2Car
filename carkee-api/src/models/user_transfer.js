module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class UserTransfer extends Model {}
  UserTransfer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transfer_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      transfer_banking_nickname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      transfer_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      transfer_amount: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      transfer_screenshot: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    { sequelize },
  );

  //   UserTransfer.associate = function (models) {
  //     // associations can be defined here
  //     // UserTransfer.belongsTo(models.User, {foreignKey: 'user_id'});
  //   };

  return UserTransfer;
};
