const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const Report = new Schema({
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ad: {
    type: Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

mongoose.plugin(mongoosePaginate)

module.exports = mongoose.model('Report', Report)
