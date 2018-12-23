module.exports = {
  uri: process.env.MONGO_URI,
  use: {
    useNewUrlParser: true,
    useCreateIndex: true
  }
}
