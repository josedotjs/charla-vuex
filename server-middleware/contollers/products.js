const ProductModel = require('../models/products')

exports.getList = async (req, res, next) => {
  const { query, ...options } = req.query

  const normalizedOptions = {
    limit: 10,
    page: 1,
    sort: { _id: -1 },
    ...options,
  }
  normalizedOptions.pagination = normalizedOptions.pagination !== 'false'
  console.log(normalizedOptions)
  const products = await ProductModel.getList(query, normalizedOptions)
  res.status(200).json(products)
}

exports.post = async (req, res, next) => {
  const data = req.body
  try {
    const productModel = new ProductModel(data)
    await productModel.save()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}
