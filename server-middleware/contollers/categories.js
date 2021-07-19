const CategoriesModel = require('../models/cat')

exports.getAll = async (req, res, next) => {
  const categories = await CategoriesModel.find({})
  res.status(200).json(categories)
}
