import JWT from 'jsonwebtoken'
import config from '../config.js'

function generateJWT(data) {
  return JWT.sign(data, config.JWT_SECRET)
}

function verifyToken(token){
  try{
    return JWT.verify(token, config.JWT_SECRET)
  }
  catch(e){
    return false
  }
}

export default {
  generateJWT,
  verifyToken
}