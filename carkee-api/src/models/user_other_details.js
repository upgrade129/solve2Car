module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class UserOtherDetails extends Model {}
  UserOtherDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      telephone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      telephone_code: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      contact_person: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      emergency_code: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      relationship: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      member_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      are_you_owner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      chasis_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      plate_no: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      car_model: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      registration_code: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
    },
    { sequelize },
  );

  //   UserOtherDetails.associate = function (models) {
  //     // associations can be defined here
  //     // UserOtherDetails.belongsTo(models.User, {foreignKey: 'user_id'});
  //   };

  return UserOtherDetails;
};
