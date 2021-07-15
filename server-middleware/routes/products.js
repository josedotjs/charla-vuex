const router = require('express').Router()
const productsController = require('../contollers/products')

router.post('/', productsController.post)
router.get('/query', productsController.getList)

module.exports = router
