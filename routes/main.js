const express = require('express');
const tasksController = require('../controllers/tasksController');
const router = express.Router();

router.get('/', tasksController.getMainPage);

module.exports = router;