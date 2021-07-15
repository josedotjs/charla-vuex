const express = require('express')
const router = express.Router()
const products = require('./products')

router.get('/', (req, res, next) => {
  res.sendStatus(200)
})
router.use('/products', products)

module.exports = router
