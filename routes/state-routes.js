const express = require('express');
const router = express.Router();
const stateController = require('../controller/state');
const { isAuthenticated } = require("../middleware/auth");

// POST - Create a new state => Admin
router.post('/admin/create-state',isAuthenticated, stateController.createState);

// POST - Create a new states => Admin
router.post('/admin/create-states',isAuthenticated, stateController.createStates);

// DELETE - Delete a state by ID => Admin
router.delete('/admin/delete-state/:state_id',isAuthenticated, stateController.deleteState);

// PUT - Update a state by ID => Admin
router.patch('/admin/update-state/:state_id',isAuthenticated, stateController.updateState);

// GET - Get all states => Admin
router.get('/get-states/:country_id', stateController.getStates);


module.exports = router;