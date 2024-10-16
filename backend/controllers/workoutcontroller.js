const Workout = require('../models/workoutModel');

exports.createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({ ...req.body, user: req.user.id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateWorkout = async (req, res) => {
    try {
      const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      res.status(200).json(workout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
exports.deleteWorkout = async (req, res) => {
    try {
      const workout = await Workout.findByIdAndDelete(req.params.id);
      if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
      }
      res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Implement other CRUD functions (update, delete, get)
