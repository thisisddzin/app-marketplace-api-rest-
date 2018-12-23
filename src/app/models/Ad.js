const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')
const Purchase = require('./Purchase')

const Ad = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

Ad.plugin(mongoosePaginate)

Ad.pre('remove', async function (next) {
  Purchase.remove({ ad: this._id }).exec()
  next()
})

module.exports = mongoose.model('Ad', Ad)
