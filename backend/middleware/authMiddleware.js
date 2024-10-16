const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware for authentication and role-based access control
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      // Attach user data from token to request object
      req.user = decoded;

      // If specific roles are required (not empty array), check if the user's role matches
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Unauthorized: Access denied' });
      }

      // Proceed to the next middleware/route
      next();
    });
  };
};
exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Adjust this line based on how you're storing the token
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id); // Find the user by ID

    if (!user || user.role !== 'admin') { // Adjust this condition based on how you define roles
      return res.status(403).json({ error: 'Access denied' });
    }

    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = authMiddleware;
