const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');
const { isAuthenticated } = require("../middleware/auth");

// POST - Create a new city => Admin
router.post('/admin/create-city',isAuthenticated, cityController.createCity);

// POST - Create a new cities => Admin
router.post('/admin/create-cities',isAuthenticated, cityController.createCities);

// DELETE - Delete a city by ID => Admin
router.delete('/admin/delete-city/:city_id',isAuthenticated, cityController.deleteCity);

// PUT - Update a city by ID => Admin
router.patch('/admin/update-city/:city_id',isAuthenticated, cityController.updateCity);

// GET - Get all cities under specific state => User
router.get('/get-cities/:state_id', cityController.getCities);


module.exports = router;