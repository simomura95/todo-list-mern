import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import todoRoutes from './routes/todos.js'
import authRoutes from './routes/auth.js'

// express app
const app = express()

// middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.use(cors())
// app.use(
//   cors({
//     origin: [process.env.CORS_ORIGIN, "http://localhost:5173/", ],
//   })
// )

// routes
app.use('/api/todo', todoRoutes)
app.use('/api/user', authRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 