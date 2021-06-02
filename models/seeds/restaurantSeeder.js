const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantJason = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  restaurantJason.results.forEach(({
    name, name_en, category, image, location,
    phone, google_map, rating, description
  }) => {
    Restaurant.create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description,
    })
  })

  console.log('done')
})

