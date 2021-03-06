console.log("Hi Jaime")

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/public'))
require('./routes')(app)



sequelize.sync()
  .then(() => {
      app.listen(config.port)
      console.log(`server started on port ${config.port}`)
  })


//app.get('/jaime',(req, res) => res.render('index'))
