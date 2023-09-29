import express from "express"
// import mongoose from "mongoose"
import {User} from "../models/userModel.js"
import jwt from "jsonwebtoken"

const router = express.Router()

const createToken = (_id) => {
  return jwt.sign({_id: _id}, process.env.SECRET) // { expiresIn: '3d' }
}

// Get all user's (TEST ONLY)
router.get('/', async(req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// Register new user
router.post('/register', async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.register(username, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

// Login user
router.post('/login', async(req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

export default router