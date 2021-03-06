const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
    secretField: {
      type: String,
      default: '',
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

ProductSchema.plugin(mongoosePaginate)

const blackList = ['secretField']

ProductSchema.statics.getList = function (query = {}, options = {}) {
  const selectFields = options.select || ''
  const fieldsToSelect = selectFields
    .split(' ')
    .filter((field) => !blackList.includes(field))
    .join(' ')
  const paginateOptions = {
    sort: { _id: -1 },
    ...options,
    select: fieldsToSelect,
  }
  return this.paginate(query, paginateOptions)
}

module.exports = mongoose.model('product', ProductSchema)
