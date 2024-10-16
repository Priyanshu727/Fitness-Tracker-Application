// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware'); // Ensure the path is correct
// Apply isAdmin middleware to all routes in this router
// router.use(isAdmin);

// Routes for admin
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.get('/statistics', adminController.getAggregateStatistics);
router.post('/fitness-programs', adminController.createFitnessProgram);
router.get('/fitness-programs', adminController.getAllFitnessPrograms);
router.delete('/fitness-programs/:id', adminController.deleteFitnessProgram);
router.put('/fitness-programs/:id', adminController.updateFitnessProgram);

module.exports = router;
