const AuthController = require('./controllers/AuthController')

const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

// express middleware
module.exports = (app) => {
  app.post('/register',
    AuthControllerPolicy.register, //validate before hitting controller
    AuthController.register)
  app.post('/login',
    AuthController.login)
}
