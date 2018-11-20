const Promise = require('bluebird') //promise library
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options){
   const SALT_FACTOR = 8

   if(!user.changed('password')){
     return
   }

   return bcrypt
   .genSaltAsync(SALT_FACTOR)
   .then(salt => bcrypt.hashAsync(user.password, salt, null))
   .then(hash => {
     // save hashed password
     user.setDataValue('password', hash)
   })
}

module.exports = (sequelize, DataTypes) => {

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
},{
    hooks: {
      beforeSave: hashPassword
    }
  })

  // user model is doing password compare instead of controller
  // useful if password compare is needed anywhere else in the app

  User.prototype.comparePassword = function(password) {
    // compare password to model password
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}
