const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalControllers');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authentication middleware is set up

// Routes for goals
router.post('/', authMiddleware(), goalController.createGoal); // Create a new goal for the authenticated user
router.get('/', authMiddleware(), goalController.getUserGoals); // Get goals for the authenticated user
router.put('/:id', authMiddleware(), goalController.updateGoal); // Update a goal by ID
router.delete('/:id', authMiddleware(), goalController.deleteGoal); // Delete a goal by ID

module.exports = router;
