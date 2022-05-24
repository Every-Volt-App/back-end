const express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
const router = express.Router();

const Location = require('../models/charger-model')

//Index: GET all the locations and rendering it as json to test
router.get('/locations', async (req, res) => {
    try {
        console.log(req.query)
        res.json(await Location.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Create: Create a new location in the DB
router.post('/locations', async (req, res) => {
    try {
        console.log(`req.body is ${req.body}`)
        let createdLocation = await Location.create(req.body)
        console.log(`created location is ${createdLocation}`)
        res.json(createdLocation)
    } catch (error) {
        res.status(400).json(error)
    }
})

//Update Location route
router.put('/locations/:id', async (req, res) => {
    try {
        let updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body)
        console.log(updatedLocation)
        res.json(updatedLocation)
    } catch (error) {
        res.status(400).json(error)
    }
})

//Delete Location route
router.delete('/locations/:id', async (req, res) => {
    try {
        let deletedLocation = await Location.findByIdAndRemove(req.params.id)
        console.log(deletedLocation)
        res.json(deletedLocation)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router