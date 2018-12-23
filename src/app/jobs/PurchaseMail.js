const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { purchaseAd, content, user } = job.data

    await Mail.sendMail({
      from: `"${user.name}" <${user.email}>`,
      to: purchaseAd.author.email,
      subject: `Soliciação de compra ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, purchaseAd, content }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
