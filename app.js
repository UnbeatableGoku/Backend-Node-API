const express = require('express')
const app = express()


//import routes
const categoryRouter = require('./routes/categoryRouter')

//middlewares
app.use(express.json())
app.use('/category', categoryRouter)

module.exports = app