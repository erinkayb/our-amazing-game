const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

let user

function jwtSignUser(user){
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // user already exists
      res.status(400).send({
        error: 'This email is already registered.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      user = await User.findOne({ //find the user where email equals email
        where: {
          email: email
        }
      })
      console.log('user', user.toJSON());
      //if it can't find user
      if(!user){
        return res.status(403).send({
          error: 'Login information is incorrect.'
        })
      }
      // check the password
      const isPasswordValid = await user.comparePassword(password)
      // if not valid... send error
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

    } catch (err) {
      res.status(500).send({
        error: 'An error has occured.'
      })
    }
  },
  async index (req, res) {
    try {
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured fetching users.'
      })
    }
  }
}
