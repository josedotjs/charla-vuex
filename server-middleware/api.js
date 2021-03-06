const express = require('express')
const app = express()
const api = require('./routes/api')
const mongoose = require('./libs/mongoose')

mongoose.set('debug', process.env.NODE_ENV !== 'production')
app.use(function (req, res, next) {
  setTimeout(next, 3000)
})
app.use(express.json())
app.use('/api', api)

module.exports = app
