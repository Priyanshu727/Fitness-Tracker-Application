// models/fitnessProgramModel.js
const mongoose = require('mongoose');

const fitnessProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Program name is required
        trim: true, // Trims whitespace from the start and end of the string
    },
    description: {
        type: String,
        required: true, // Description is required
        trim: true,
    },
    duration: {
        type: Number,
        required: true, // Duration in weeks
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'], // Only allow these values
        required: true, // Level is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the program is created
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model, if necessary
    },
});

// Export the Fitness Program model
module.exports = mongoose.model('FitnessProgram', fitnessProgramSchema);
