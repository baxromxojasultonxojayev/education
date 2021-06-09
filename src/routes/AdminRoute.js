import express from 'express'

import UserController from '../controller/UserController.js'
import AdminController from '../controller/AdminController.js'

import AdminMiddleware from '../middleware/AdminMiddleware.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'

const router = express.Router()
router.use(AuthMiddleware)

router.patch('/', AdminMiddleware, AdminController.editSettings)


export default{
  path: '/admin',
  router: router
}