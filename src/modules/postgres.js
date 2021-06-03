import { Sequelize } from 'sequelize'
import config from '../config.js'
import AttemptsModel from '../models/AttemptsModel.js'
import UserModel from '../models/UserModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
  logging: false
})

async function postgres () {
  try{
    let db = {}

    db.users = await UserModel(Sequelize, sequelize)
    db.attempts = await AttemptsModel(Sequelize, sequelize)

    await db.users.hasMany(db.attempts, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    await db.attempts.belongsTo(db.users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    // await sequelize.sync({force: true})
    return db
  }
  catch(e){
    console.log('e: ', e);
  }
}

export default postgres