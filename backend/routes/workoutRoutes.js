const express = require('express');
const { createWorkout } = require('../controllers/workoutcontroller');
const authMiddleware = require('../middleware/authMiddleware');
const workoutController = require('../controllers/workoutcontroller');
const router = express.Router();

router.post('/', authMiddleware('User'), createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
