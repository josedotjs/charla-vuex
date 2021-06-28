const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'documents.json'))
const middlewares = jsonServer.defaults()

server.use(function (req, res, next) {
  setTimeout(next, 2000)
})
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
server.use('/api', router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})
