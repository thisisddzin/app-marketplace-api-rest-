const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenConfig = require('../../config/tokenConfig')
const Ad = require('./Ad')
const Purchase = require('./Purchase')

const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

User.pre('remove', function (next) {
  Ad.remove({ author: this._id }).exec()
  Purchase.remove({ intencionBy: this._id }).exec()
  next()
})

User.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

User.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, tokenConfig.secret, { expiresIn: tokenConfig.ttl })
  }
}

module.exports = mongoose.model('User', User)
