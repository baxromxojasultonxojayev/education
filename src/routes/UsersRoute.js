import express from 'express'

import UserController from '../controller/UserController.js'

const router = express.Router()
router.post('/checkphone', UserController.checkPhone)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validatecode', UserController.validateCode)


export default{
  path: '/users',
  router: router
}