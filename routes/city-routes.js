const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');
const { isAuthenticated } = require("../middleware/auth");

// POST - Create a new state => Admin
router.post('/admin/create-city',isAuthenticated, cityController.createCity);

// POST - Create a new states => Admin
router.post('/admin/create-cities',isAuthenticated, cityController.createCities);

// DELETE - Delete a state by ID => Admin
router.delete('/admin/delete-city/:city_id',isAuthenticated, cityController.deleteCity);

// PUT - Update a state by ID => Admin
router.patch('/admin/update-city/:city_id',isAuthenticated, cityController.updateCity);

// GET - Get all states => Admin
router.get('/get-cities/:state_id', cityController.getCities);


module.exports = router;