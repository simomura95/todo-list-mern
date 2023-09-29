import mongoose from 'mongoose'
// import validator from 'validator'
import bcrypt from "bcrypt";

const Schema = mongoose.Schema

const itemSchema = new Schema({
  text: String,
  isChecked: {
    type: Boolean,
    required: true,
    default: false
  },
})

const listSchema = new Schema({
  title: String,
  items: [itemSchema]
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todoLists: [listSchema]
})

// static signup method
// questo metodo statico farà quindi parte dello schema e potrà essere usato su ogni suo modello
userSchema.statics.register = async function(username, password) {

  // validation
  if (!username || !password) {
    throw Error('All fields must be filled')
  }
  // per controllare che il campo mail sia effettivamente una email
  // if (!validator.isEmail(email)) {
  //   throw Error('Email is not valid')
  // }
  // if(!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }
 
  // user model non esiste ancora, quindi uso this al suo posto
  // Per usare bcrypt deve essere funzione vera e non arrow function!!
  const exists = await this.findOne({ username })
  if (exists) {
    throw Error('Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, password: hash})
  return user
}

// static login method
userSchema.statics.login = async function(username, password) {
  // validation
  if (!username || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Username not in use')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Wrong passord')
  }

  return user
}

const User = mongoose.model('User', userSchema)
const List = mongoose.model('List', listSchema)
const Item = mongoose.model('Item', itemSchema)
export { User, List, Item }