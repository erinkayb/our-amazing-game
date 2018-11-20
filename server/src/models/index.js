const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize (
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// help to possibly add more models if we need to later... 
fs
  .readdirSync(__dirname) //read through current dir and gives array of files
  .filter((file) => //filter everything that is not index.js
    file !== 'index.js'
  )
  .forEach((file) => {
      // joining dirname to file and then sequelize imports it
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model //in this case it will be db.User = model
  })

  db.sequelize = sequelize
  db.Sequelize = sequelize

module.exports = db
