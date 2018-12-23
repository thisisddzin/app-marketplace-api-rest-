const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const Report = require('../models/Report')

class AcceptController {
  async create (req, res) {
    const { id } = req.params

    const purchase = await Purchase.findById(id)

    if (!purchase) {
      return res.json({ error: 'Essa intenção não existe mais' })
    }

    if (await Report.findOne({ ad: purchase.ad })) {
      return res.json({ error: 'Você já aceitou esta compra.' })
    }

    const ad = await Ad.findById(purchase.ad)
    ad.purchasedBy = purchase.intencionBy
    ad.save()

    const { purchasedBy, price, author, description, title } = ad

    const report = await Report.create({
      purchasedBy,
      price,
      author,
      description,
      title,
      ad: ad._id
    })

    await Purchase.findByIdAndDelete(req.params.id)

    return res.json(report)
  }

  async list (req, res) {
    const reports = await Report.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        sort: '-createdAt',
        populate: [['purchasedBy'], ['author']]
      }
    )

    return res.json(reports)
  }

  async destroy (req, res) {
    await Report.findByIdAndDelete(req.params.id)

    return res.json('Report destruido com sucesso')
  }
}

module.exports = new AcceptController()
