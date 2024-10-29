const express = require('express');
const router = express.Router();
const countryController = require('../controller/country');
const { isAuthenticated } = require("../middleware/auth");

// POST - Create a new country => Admin
router.post('/admin/create-country',isAuthenticated, countryController.createCountry);

// POST - Create a new countries => Admin
router.post('/admin/create-countries',isAuthenticated, countryController.createCountries);

// DELETE - Delete a country by ID => Admin
router.delete('/admin/delete-country/:country_id',isAuthenticated, countryController.deleteCountry);

// PUT - Update a country by ID => Admin
router.patch('/admin/update-country/:country_id',isAuthenticated, countryController.updateCountry);

// GET - Get all countries => Admin
router.get('/get-countries', countryController.getCountries);


module.exports = router;