console.log('hello!')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined')) //prints logs
app.use(bodyParser.json())
app.use(cors()) //server to host on a different domain

app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.email}`
  })
})

app.listen(process.env.PORT || 8081)
