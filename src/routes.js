const { Router } = require('express')
const devController = require('./controllers/DevController')
const searchController = require('./controllers/SearchController')

const routes = Router()

routes.get('/search', searchController.index)
routes.post('/devs', devController.store)
routes.get('/devs', devController.index)
routes.get('/health', (request, response) => response.status(200).json({ status: 'health' }))

module.exports = routes
