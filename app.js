const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => res.send('Hello World!'))




app.listen(port, () => console.log(`listening on port ${port}!`))