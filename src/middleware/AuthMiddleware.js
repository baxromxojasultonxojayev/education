import JWT from "../modules/jwt.js"

export default async (req, res, next) =>{
  try{
    const token = req.headers['authorization']

    if(!token) throw new Error('Token is not found')

    const data = JWT.verifyToken(token)

    if(!data) throw new Error('Invalid Token')
    
    const session = await req.postgres.sessions.findOne({
      where: {
        id: data.id
      }
    })

    if(!session) throw new Error('Session has been expired')

    if(req.headers['user-agent'] !== session.dataValues.user_agent){
      await req.postgres.sessions.destroy({
        where: {
          user_id: session.dataValues.user_id
        } 
      })
      throw new Error('Invalid user agent')
    }

    req.user = session.dataValues.user_id

    next()

  }
  catch(e){
    res.status(403).json({
      ok: false,
      message: e + ''
    })
  }
}