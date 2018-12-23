const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const controller = require('./app/controllers')
const validator = require('./app/validators')

const auth = require('./app/middlewares/auth')

// Route for create a session
routes.post(
  '/session',
  validate(validator.Session),
  handle(controller.SessionController.create)
)

// Routes of users, without need of the authentication
routes.get('/users', handle(controller.UserController.list))
routes.post(
  '/users',
  validate(validator.User),
  handle(controller.UserController.store)
)
routes.get('/users/:id', handle(controller.UserController.show))

// Routes of ads, without need of the authentication
routes.get('/ads', handle(controller.AdController.list))
routes.get('/ads/:id', handle(controller.AdController.show))

// ********************************************************
// *** In this point on, the user must be authenticated ***
// ********************************************************

routes.use(auth)

// Routes of 'users' for the authenticated users
routes.put(
  '/users/:id',
  validate(validator.User),
  handle(controller.UserController.update)
)
routes.delete('/users/:id', handle(controller.UserController.destroy))

// Routes of' ads' for the authenticated user
routes.put(
  '/ads/:id',
  validate(validator.Ad),
  handle(controller.AdController.update)
)
routes.post(
  '/ads',
  validate(validator.Ad),
  handle(controller.AdController.store)
)
routes.delete('/ads/:id', handle(controller.AdController.destroy))

// Routes of 'purchases' for the authenticated user
routes.post(
  '/purchase',
  validate(validator.Purchase),
  handle(controller.PurchaseController.store)
)

routes.get('/purchase', handle(controller.PurchaseController.list))
routes.delete('/purchase/:id', handle(controller.PurchaseController.destroy))

// Route of accept intention
routes.post('/accept/:id', handle(controller.AcceptController.create))
routes.get('/accept', handle(controller.AcceptController.list))
routes.delete('/accept/:id', handle(controller.AcceptController.destroy))

module.exports = routes
