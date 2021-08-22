export default function ({ $axios, $config, env }, inject) {
  console.log('env', env)
  console.log('$config', $config)

  const baseUrlProducts = `${env.NUXT_ENV_BASE_URL_PRODUCTS}${$config.API_PRODUCTS}`
  console.log('baseUrlProducts', baseUrlProducts)
  // Create a custom axios instance
  const apiProducts = $axios.create()
  apiProducts.setBaseURL(baseUrlProducts)

  const baseUrlDocuments = `${env.NUXT_ENV_BASE_URL_DOCUMENTS}${$config.API_DOCUMENTS}`
  const apiDocuments = $axios.create()
  apiDocuments.setBaseURL(baseUrlDocuments)

  const apiMongoose = $axios.create({
    baseURL: $config.API_MONGOOSE,
  })

  const apiPaginator = $axios.create({
    baseURL: 'http://localhost:3005',
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
  inject('apiPaginator', apiPaginator)
  inject('serialize', serialize)
}
