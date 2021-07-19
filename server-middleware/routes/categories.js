const router = require('express').Router()
const CategoriesController = require('../contollers/categories')

router.get('/', CategoriesController.getAll)

module.exports = router
