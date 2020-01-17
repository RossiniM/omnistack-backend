const Dev = require('../models/developer')
const parseStringAsArrays = require('../utils/parseStringAsArray')
module.exports = {
  async index (request, response) {
    const { latitude, longitude, techs } = request.query
    const techsArrays = parseStringAsArrays(techs)
    const devs = await Dev.find({
      techs: { $in: techsArrays },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }

    }).catch(error => console.log(error))

    return response.json({ devs })
  }

}
