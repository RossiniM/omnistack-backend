const express = require('express')
const mongoose = require('mongoose')
const routes = require('../src/routes')
const port = 3000

const app = express()
app.use(express.json())
app.use(routes)

mongoose
  .connect('mongodb://127.0.0.1/omnistack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, console.log(`I am listening at port ${port}`)))
  .catch(error => console.log(error))
