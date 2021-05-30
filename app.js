
// require package used in the project
const express = require('express')
const app = express()
const port = 3000
//set express handlebars(exphbs)
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')
//read restaurant_list.json
const restaurantList = require('./restaurant.json')

// setting static files
app.use(express.static('public'))

//route setting 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//route setting for show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//route setting for search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//start and listen on the Express server
app.listen(port, () => {
})