const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/tasks')

router.get('/', TaskController.get)
router.post('/', TaskController.save)
router.put('/:id', TaskController.update)
router.delete('/:id', TaskController.delete)

module.exports = router;