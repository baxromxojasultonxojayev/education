import express from 'express'

import UserController from '../controller/UserController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'

const router = express.Router()
router.post('/checkphone', UserController.checkPhone)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validatecode', UserController.validateCode)

router.post('/edit', AuthMiddleware, UserController.editPersonalData)

router.post('/editPhoto', AuthMiddleware, UserController.editPhoto)

router.get('/', AuthMiddleware, UserController.getData)




export default{
  path: '/users',
  router: router
}