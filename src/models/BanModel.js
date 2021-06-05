export default async (Sequelize, sequelize) => {
  return await sequelize.define('bans', {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    expiredDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,

    }
  })
}