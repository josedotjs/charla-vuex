export default function ({ $axios, $config, env }, inject) {
  console.log(env)
  // Create a custom axios instance
  const apiProducts = $axios.create()
  apiProducts.setBaseURL($config.API_PRODUCTS)

  const apiDocuments = $axios.create()
  apiDocuments.setBaseURL(`http://localhost:3002${$config.API_DOCUMENTS}`)

  const apiMongoose = $axios.create({
    baseURL: $config.API_MONGOOSE,
  })

  const serialize = function (obj, prefix) {
    const str = []
    let p
    for (p in obj) {
      if ({}.propertyIsEnumerable.call(obj, p)) {
        const k = prefix ? prefix + '[' + p + ']' : p
        const v = obj[p]
        str.push(
          v !== null && typeof v === 'object'
            ? serialize(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        )
      }
    }
    return str.join('&')
  }
  // Inject to context as $api
  inject('api', apiProducts)
  inject('apiDocuments', apiDocuments)
  inject('apiMongoose', apiMongoose)
  inject('serialize', serialize)
}
