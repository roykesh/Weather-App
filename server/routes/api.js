const express = require('express')
const router = express.Router()
const request = require('request')
const apiKey = "71b5b5cd59004ae089d33355182308"

const City = require('../model/City')

// SANITY route
router.get('/sanity', function (req, res) {
    console.log("Server is working. The prophecy is upon us")
    response.end()
})
// http://api.apixu.com/v1/current.json?key=71b5b5cd59004ae089d33355182308&q=Melbourne

// Test API request with Melbz
router.get('/weather', (req, res) => {
    request(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=Melbourne`, (err, response) => {
        console.log(response)
        res.send(response)
    })
})

// GET by city name
router.get('/city/:cityName', (req, res) => {
    request(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${req.params.cityName}`, (err, response) => {
        console.log(`Getting ${req.params.cityName}'s info`)
        const parsedResponse = JSON.parse(response.body)
        console.log(parsedResponse)
        res.send(parsedResponse)
    })
})

// find all data on DB - send to client
router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

// POST save new City to DB   ///    TEMP C
router.post('/city', function (req, res) {
    console.log(req.body)
    let newCity = new City({
        name: req.body.name,
        updatedAt: req.body.updatedAt,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    console.log(newCity)
    newCity.save()
    res.end()
})

// Remove City from DB
router.delete('/city/:cityName', (req, res) => {
    const cityName = req.params.cityName
    City.findOneAndDelete({
        name: cityName
    }, function (err) {})
    res.end()
})

module.exports = router