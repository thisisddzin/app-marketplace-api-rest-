const User = require('../models/User')

class UserController {
  async show (req, res) {
    const user = await User.findById(req.params.id)

    return res.json(user)
  }

  async list (req, res) {
    const users = await User.find()

    return res.json(users)
  }

  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async update (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(user)
  }

  async destroy (req, res) {
    const user = await User.findById(req.params.id)

    user.remove()

    return res.send('Usuário deletado')
  }
}

module.exports = new UserController()
