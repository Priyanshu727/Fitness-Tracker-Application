const Goal = require('../models/goalModel');

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
      const userId = req.user.id;  // Ensure the user ID is being set from the token

      // Create a new goal with the user's ID
      const newGoal = new Goal({
          user: userId,
          goalType: req.body.goalType, // Ensure this field is sent in the request body
          target: req.body.target, // Ensure this field is sent in the request body
          progress: req.body.progress || 0, // Optional field
      });

      await newGoal.save();
      res.status(201).json(newGoal);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get all goals for the authenticated user
exports.getUserGoals = async (req, res) => {
  const userId = req.user._id; // Assuming user is authenticated

  try {
    const goals = await Goal.find({ user: userId });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a goal by ID
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { goalType, target, progress } = req.body;

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { goalType, target, progress },
      { new: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a goal by ID
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
