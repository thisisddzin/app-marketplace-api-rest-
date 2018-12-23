const User = require('../models/User')
const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate([
      ['author'],
      ['purchasedBy']
    ])

    if (purchaseAd.purchasedBy) {
      return res.json({
        error: `este item já foi comprado por: ${purchaseAd.purchasedBy.name}`
      })
    }

    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      purchaseAd,
      user,
      content
    }).save()

    const purchase = await Purchase.create({
      content,
      ad,
      intencionBy: req.userId
    })

    return res.json(purchase)
  }

  async list (req, res) {
    const purchases = await Purchase.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        sort: '-createdAt',
        populate: [['intencionBy'], ['ad']]
      }
    )

    return res.json(purchases)
  }

  async destroy (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    purchase.remove()

    return res.send('purchase deletado')
  }
}

module.exports = new PurchaseController()
