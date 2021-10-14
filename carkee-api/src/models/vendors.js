module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Vendors extends Model {}
  Vendors.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      step: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vendor_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_uen: {
        type: DataTypes.STRING(20),
        allowNull: true,
        default: null,
      },
      company_employees: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      company_mobile_code: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      company_mobile: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      company_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      company_country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      company_unit_no: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      company_logo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      company_add_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      company_add_2: {
        type: DataTypes.STRING(255),
      },
    },
    { sequelize, timestamps: true },
  );

  //   Vendors.associate = function (models) {
  //     // Vendors.belongsTo(models.Account, { foreignKey: 'account_id', as: "account" });
  //   };

  return Vendors;
};
