module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Roles extends Model {}
  Roles.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, timestamps: false },
  );
  Roles.associate = (models) => {
    // associations can be defined here
    // Roles.belongsTo(models.User, {foreignKey: 'user_id'});
    Roles.belongsToMany(models.User, {
      foreignKey: 'role_id',
      as: 'user',
      through: 'UserRole',
      timestamps: false,
    });
  };

  return Roles;
};
