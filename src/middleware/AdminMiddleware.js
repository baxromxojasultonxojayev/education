import JWT from "../modules/jwt.js"

export default async (req, res, next) =>{
  try{

    const user = await req.postgres.users.findOne({
      where: {
        user_id: req.user
      }
    })
    console.log(user);
    if(user.dataValues.role != 'admin' && user.dataValues.role != 'superadmin'){
      throw new Error('You do not have permission')
    }
    req.isSuperAdmin = user.dataValues.role == 'superadmin'
    next()

  }
  catch(e){
    res.status(403).json({
      ok: false,
      message: e + ''
    })
  }
}