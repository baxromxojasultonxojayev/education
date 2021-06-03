import express from 'express'
import http from 'http'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import postgres from './modules/postgres.js'
import routes from './routes/routes.js'



async function main(){
  let __driname = path.resolve(path.dirname(''))
  
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
    next()
  })

  routes(app)
} 
main()