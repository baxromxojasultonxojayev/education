import { Sequelize } from 'sequelize'
import config from '../config.js'
import AttemptsModel from '../models/AttemptsModel.js'
import BanModel from '../models/BanModel.js'
import UserModel from '../models/UserModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
  logging: false
})

async function postgres () {
  try{
    let db = {}

    db.users = await UserModel(Sequelize, sequelize)
    db.attempts = await AttemptsModel(Sequelize, sequelize)
    db.bans = await BanModel(Sequelize, sequelize)

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

    await db.users.hasMany(db.bans, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })

    await db.bans.belongsTo(db.users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    })
    // await sequelize.sync({force: true})
    // await db.bans.destroy({
    //   where: {
    //     user_id: '95a62b4a-d017-44c7-b45a-cc48ae795672'
    //   }
    // })
    return db
  }
  catch(e){
    console.log('e: '+ e);
  }
}

export default postgres