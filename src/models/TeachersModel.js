export default async (Sequelize, sequelize) => {
  return await sequelize.define('teachers', {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    
    ip_address: {
      type: Sequelize.DataTypes.INET,
      allowNull: false
    },

    
  })
}