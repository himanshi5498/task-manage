const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const taskValidator = require('./taskValidator');

router.get('/', taskController.getTaskCount);
router.post('/', taskValidator.createTask, taskController.createTask);
router.put('/', taskValidator.updateTask, taskController.updateTask);
router.get('/metrics', taskController.getMetrics);

module.exports = router;