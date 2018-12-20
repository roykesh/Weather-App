// Server setup
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', {
    useNewUrlParser: true
})


// const apiKey = "71b5b5cd59004ae089d33355182308"

app.use('/', api)

const port = 7070
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})