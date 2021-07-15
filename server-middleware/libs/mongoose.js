const mongoose = require('mongoose')
// const config = require('../config')

console.log('url mongoose', process.env.MONGO_URI)
// Todo: Agregar cadena de conexión desde un config
const HOST = process.env.MONGO_URI

mongoose
  .connect(HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`✓ Conexión establecida: ${HOST}`)
  })

mongoose.connection.on('error', () => {
  throw new Error(`No se pudo conectar a la base de datos: ${HOST}`)
  // process.exit()
})

const gracefulExit = () => {
  console.log(`Cerrando conexión de ${HOST} \n`)
  // console.log(db)
  mongoose.connection.close()
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

module.exports = mongoose
