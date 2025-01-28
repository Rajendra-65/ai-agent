import express from 'express'
import morgan from 'morgan'
dotenv.config()
import dotenv from 'dotenv'
import connect from './db/db.js'
import userRoutes from './routes/user.rotes.js'
import cookieParser from 'cookie-parser'

connect()

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/users',userRoutes)
app.get('/',(req,res)=>{
    res.send('Hello World')
})

export default app