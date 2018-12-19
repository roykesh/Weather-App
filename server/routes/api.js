const express = require('express')
const router = express.Router()
const apiKey = "71b5b5cd59004ae089d33355182308"
const request = require('request')

router.get('/weather', (req, res) => {
    request(`http://api.apixu.com/v1/current.json?key=71b5b5cd59004ae089d33355182308&q=Melbourne`, (err, response) => {
        console.log("API request working!")
        res.send(response)
    })
})


// router.post('/wonder', function (req, res) {
//     console.log("Someone's trying to make a post request")
//     wonders.push({ ...req.body,
//         visited: false
//     })
//     res.send(wonders)
// })

// router.put('/wonder/:name', function (req, res) {
//     console.log(`About to update someone`)
//     let wonder = req.params.name
//     wonders.find(w => w.name === wonder).visited = true;
//     res.end()
// })

// router.delete('/wonder/:name', (req, res) => {
//     let wonder = req.params.name
//     let wonderIndex = wonders.findIndex(w => w.name === wonder)
//     wonders.splice(wonderIndex, 1)
//     res.end()
// })

module.exports = router