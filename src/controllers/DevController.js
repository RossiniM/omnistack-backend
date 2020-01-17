const Dev = require('../models/developer')
const axios = require('axios')
const parseStringAsArray = require('../utils/parseStringAsArray')
module.exports = {
  async store (request, response) {
    const { github_username, techs, latitude, longitude } = request.body
    let dev = await Dev.findOne({ github_username })
    if (!dev) {
      const { name, avatar_url, bio } = await axios.get(`https://api.github.com/users/${github_username}`)
      const techArray = parseStringAsArray(techs)
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
      dev = await Dev
        .create({ github_username, name, avatar_url, bio, techs: techArray, location })
        .catch(error => console.error(error))
    }
    return response.status(200).json(dev)
  },

  async index (request, response) {
    const devs = await Dev.find()
    response.json(devs)
  }

}
