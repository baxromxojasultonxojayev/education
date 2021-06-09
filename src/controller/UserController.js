import phoneValidation from "../validation/phoneValidation.js"
import signupValidation from "../validation/signupValidation.js";
import randomNumber from "random-number"
import codeValidation from "../validation/codeValidation.js";
import editValidation from "../validation/editValidation.js";
import pkg from "sequelize";
import moment from "moment";
import JWT from '../modules/jwt.js  '
import editPhotoValidation from "../validation/editPhotoValidation.js";
import promoteUserValidation from "../validation/promoteUserValidation.js";

const {Op} = pkg

 class UserController{
  static async checkPhone(req, res){
    try{
      const data = await phoneValidation.validateAsync(req.body)
      let user = await req.postgres.users.findOne({
        where: {
          phone: data.phone
        }
      })
      res.status(200).json({
        ok: true,
        exists: user ? true : false 
      })
      
    }
    catch(e){
      res.status(400).json({
        ok: 'false',
        message: e + ''
      })
    }
  }

  static async signup(req, res) {
    try{
      const data = await signupValidation.validateAsync(req.body)
      // console.log(data);

      const user = await req.postgres.users.create({
        name: data.name,
        bdate: data.bdate,
        phone: data.phone,
        gender: data.gender == 1 ? 'female' : 'male'
      })
      
      res.status(200).json({
        ok: true,
        message: "Registrated",
        data: user.dataValues
      })
    }
    catch(e){
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }

  static async login (req, res){
      try{
        const data = await  phoneValidation.validateAsync(req.body) 

        const user = await req.postgres.users.findOne({
          where: {
            phone: data.phone
          }
        })
        if(!user) throw Error('User not found')

        const ban = await req.postgres.bans.findOne({
          where: {
            user_id : user.dataValues.user_id,
            expiredDate: {
              [Op.lt]: new Date()
            }
          }
        })
        console.log(ban);

        if(ban) {
          throw new Error(`You have been banned till ${moment(ban.dataValues.expiredDate )}` )
        }
      const gen = randomNumber.generator({
        min:  100000
      , max:  999999
      , integer: true
      })
  
      await req.postgres.attempts.destroy({
        where: {
          user_id: user.user_id
        }
      })

      let attempt= await req.postgres.attempts.create({
        code: gen(),
        user_id: user.user_id
      })


      // await sendingMessage(data.phone, `Your code is ${attempt.dataValues.code}`)
      console.log(attempt.dataValues.code);

      await res.status(201).json({
        ok: true,
        message: 'Code has been sent',
        id: attempt.dataValues.id
      })


      }
      catch(e){
        res.status(401).json({
          ok: false,
          message: e + ''
        })
      }
  }

  static async validateCode(req, res){
    try{
      const validationId = req.headers['code-validation-id']
      if(!validationId) throw new Error('Invalid validation token')
      
      let attempt = await req.postgres.attempts.findOne({
        where: {
          id: validationId
        },
        include: {
          model: req.postgres.users,
          attributes: ['user_attempts']
        }
      })

      
      if(!attempt) throw new Error('Code is not found')
      
      const { code } = await codeValidation.validateAsync(req.body)
      
      console.log(req.setting);      
      if(Number(code) !== Number(attempt.dataValues.code)){
        const settings = await req.postgres.setting.findAll()

        // const codeAttemptSize = settings.find(x => x.dataValues.name = 'code_attempts')
        // const phoneAttemptSize = settings.find(x => x.dataValues.name = 'phone_attempts')
        // const banTimeSize = settings.find(x => x.dataValues.name = 'ban_time')  

        // console.log(codeAttemptSize.dataValues.value)
        // console.log(phoneAttemptSize.dataValues.value)
        // console.log(banTimeSize.dataValues.value)

        await req.postgres.attempts.update({
          attempts: attempt.dataValues.attempts + 1
        },{
          where: {
            id: validationId
          }
        }) 
        if(Number(attempt.dataValues.attempts) >= Number(req.setting.code_attempts)-1){
          await req.postgres.attempts.destroy({
            where: {
              id: validationId
            }
          })
        

          await req.postgres.users.update({
            user_attempts: attempt.dataValues.user.dataValues.user_attempts + 1 
          }, {
            where: {
              user_id: attempt.dataValues.user_id
            }
          })

          if(Number(attempt.dataValues.user.dataValues.user_attempts) > Number(req.setting.phone_attempts)-1){
            await req.postgres.users.update({
                user_attempts: 0
              }, 
              {
                where: {
                  user_id: attempt.dataValues.user_id
              }
            })

            await req.postgres.bans.create({
              user_id: attempt.dataValues.user_id,
              expiredDate: new Date(Date.now() + Number(req.setting.ban_time))
            })
          }
        }
        throw new Error('Incorrect validation code')
      }

      await req.postgres.sessions.destroy({
        where: {
          user_id: attempt.dataValues.user_id
        }
      })

      const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const userAgent = req.headers['user-agent']
      
      if(!(ipAddress && userAgent)){
        throw new Error('Unable device')
      }
      console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress, req.headers['user-agent']);


      const session = await req.postgres.sessions.create({
        user_id: attempt.dataValues.user_id,  
        ip_address: ipAddress,
        user_agent: userAgent 
      })
      if(!session) throw new Error('no session')

      const token = JWT.generateJWT({
        id: session.dataValues.id,

      })

      await req.postgres.attempts.destroy({
        where: {
          user_id: attempt.dataValues.user_id
        }
      })

      await req.postgres.attempts.update({
        user_attempts: 0
      },{
        where: {
          user_id: attempt.dataValues.user_id
        }
      })
      res.status(200).json({
        ok: true,
        message: "You have logged",
        token: token
      })


    }
    catch(e){
      res.status(401).json({
        ok: false,
        message: e + ''
      })
    }
  }

  static async editPersonalData(req, res){
    try{
      const data = await editValidation.validateAsync(req.body)
      const info = {
        ... data,
        gender: data.gender == 2 ? 'male' : 'female'
      }
      await req.postgres.users.update(info, {
        where: {
          user_id: req.user
        }
      })

      await res.status(202).json({
        ok: true,
        message: "Changes has been accepted",
        data: info
      })
    }
    catch(e){
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }

  static async getData(req, res){
    try{
      const user = await req.postgres.users.findOne({
        where: {
          user_id: req.user
        },
        include: {
          model: req.postgres.user_photo,
          include: {
            model: req.postgres.file_model
          }

        }
      })
      await res.status(200).json({
        ok: true,
        message: user.dataValues,
      })
    }
    catch(e){
      res.status(500).json({
        ok: true,
        message: e + ""
      })
    }
  }

  static async editPhoto(req, res){
    try{
      const data = await editPhotoValidation.validateAsync(req.body)
      
      await req.postgres.user_photo.destroy({
        where: {
          user_id: req.user
        }
      })
      const photo = await req.postgres.user_photo.create({
        file_id: data.file_id,
        user_id: req.user,

      })

      await res.status(202).json({
        ok: true,
        message: "Changes has been accepted",
      })
    }
    catch(e){
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }

  static async promoteUser(req, res){
    try{
      const data = await promoteUserValidation.validateAsync(req.body) 

      if(data.user_id === req.user){
        throw new Error('You can not promote yourself')
      }

      const user = await req.postgres.users.findOne({
        where: {
          user_id: data.user_id
        }
      })

      if(user.dataValues.role === 'superadmin'){
        throw new Error("You are unable to edit role")
      }
      if(user.dataValues.role === 'admin' && (!req.isSuperAdmin)){
        throw new Error("You are unable to edit admin")
      }
      
      await req.postgres.users.update({
        role: data.role
      },{
        where: {
          user_id: data.user_id
        }
      })

      // console.log(user.dataValues);
      await res.status(202).json({
        ok: true,
        message: "Good Job",
      })
    }catch(e){
      res.status(400).json({
        ok: false,
        message: e + ''
      })
    }
  }
}

export default  UserController