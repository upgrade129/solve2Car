module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class UserDetails extends Model {}
  UserDetails.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      mobile_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notEmpty: false,
        },
      },
      mobile: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      gender: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      unit_no: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      add_1: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      add_2: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      nric: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      img_profile: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      profession: {
        type: DataTypes.STRING(70),
        allowNull: true,
      },
      annual_salary: {
        type: DataTypes.STRING(70),
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    { sequelize },
  );

  //   UserDetails.associate = function (models) {
  //     // associations can be defined here
  //     // UserDetails.belongsTo(models.User, {foreignKey: 'user_id'});
  //   };

  return UserDetails;
};
