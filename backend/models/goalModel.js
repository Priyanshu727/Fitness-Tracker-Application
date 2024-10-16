// models/goalModel.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true // Field is required
    },
    goalType: {
        type: String,
        required: true // e.g., "weekly", "monthly"
    },
    target: {
        type: Number,
        required: true // e.g., total calories, hours, etc.
    },
    progress: {
        type: Number,
        default: 0 // Initial progress set to 0
    },
    dateSet: {
        type: Date,
        default: Date.now // Automatically set the date when the goal is created
    }
});

// Middleware to update progress or validate conditions can be added here if necessary

// Export the Goal model
module.exports = mongoose.model('Goal', goalSchema);
