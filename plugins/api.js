export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const apiProducts = $axios.create()
  apiProducts.setBaseURL($config.API_PRODUCTS)

  const apiDocuments = $axios.create()
  apiDocuments.setBaseURL(`http://localhost:3002${$config.API_DOCUMENTS}`)
  // Inject to context as $api
  inject('api', apiProducts)
  inject('apiDocuments', apiDocuments)
}
