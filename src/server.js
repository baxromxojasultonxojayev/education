import express from 'express'
import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import postgres from './modules/postgres.js'
import routes from './routes/routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.js';



async function main(){
  let __driname = path.resolve(path.dirname(''))
  let setting = await fs.readFile(path.join(__driname, "setting.json"), 'utf-8')

  setting = JSON.parse(setting)
  console.log(setting);
  let db = await postgres() 
  // console.log(db);


  const app = express()
  const server = http.createServer(app)
  server.listen(8000, ()=> console.log(`Server is ready`))
  
  app.use(cors())
  app.use(helmet()) 
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))


  app.use(async (req, res, next) => {
    req.postgres = db
    req.setting = setting
    next()
  })
  app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  routes(app)
} 
main()