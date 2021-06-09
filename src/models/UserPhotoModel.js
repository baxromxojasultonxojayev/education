export default async (Sequelize, sequelize) => {
  return await sequelize.define('photos', {
    photo_id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  })
}