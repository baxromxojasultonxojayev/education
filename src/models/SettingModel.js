export default async (Sequelize, sequelize) => {
  return await sequelize.define('setting', {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    name: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false
    },
    value: {
      type: Sequelize.DataTypes.STRING(32),
      allowNull: false
    }

  })
}