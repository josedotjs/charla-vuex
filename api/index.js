const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(function (req, res, next) {
  setTimeout(next, 3000)
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
server.listen(3001, () => {
  console.log('JSON Server is running')
})
