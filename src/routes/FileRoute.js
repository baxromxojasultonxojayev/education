import express from 'express'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import fileUpload from 'express-fileupload'
import FileController from '../controller/FileController.js'
import path from 'path'
let __dirname = path.resolve(path.dirname(''))

const router = express.Router()

router.use(AuthMiddleware)


const option = fileUpload({
  safeFileNames: true
})

router.post('/create',fileUpload('file', option) , FileController.newFile)
router.use('/getFile', express.static(path.join(__dirname, 'src', 'public','files')))
export default {
  path: '/file',
  router: router
} 