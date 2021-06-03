import phoneValidation from "../validation/phoneValidation.js"
import signupValidation from "../validation/signupValidation.js";

 class UserController{
  static async checkPhone(req, res){
    try{
      const data = await phoneValidation.validateAsync(req.body)
      console.log(data);
      let user = await req.postgres.users.findOne({
        where: {
          phone: data.phone
        }
      })
      console.log(user);
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
      if(!user) throw Error('xato')

      console.log(user);
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
}

export default  UserController