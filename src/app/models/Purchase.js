const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

const Purchase = new Schema({
  content: {
    type: String,
    required: true
  },
  ad: {
    type: Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  intencionBy: {
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

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)
