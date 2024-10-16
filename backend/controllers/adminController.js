// controllers/adminController.js
const User = require('../models/userModel');
const Workout = require('../models/workoutModel');
const FitnessProgram = require('../models/fitnessProgramModel');

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get aggregate workout statistics (Admin only)
exports.getAggregateStatistics = async (req, res) => {
    try {
        const totalWorkouts = await Workout.countDocuments();
        const totalUsers = await User.countDocuments();
        // Add other aggregate stats as needed
        res.status(200).json({
            totalWorkouts,
            totalUsers,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a fitness program (Admin only)
exports.createFitnessProgram = async (req, res) => {
    try {
        const fitnessProgram = new FitnessProgram(req.body);
        await fitnessProgram.save();
        res.status(201).json(fitnessProgram);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all fitness programs (Admin only)
exports.getAllFitnessPrograms = async (req, res) => {
    try {
        const programs = await FitnessProgram.find();
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a fitness program by ID (Admin only)
exports.deleteFitnessProgram = async (req, res) => {
    try {
        const program = await FitnessProgram.findByIdAndDelete(req.params.id);
        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }
        res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a fitness program by ID (Admin only)
exports.updateFitnessProgram = async (req, res) => {
    try {
        const program = await FitnessProgram.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }
        res.status(200).json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
