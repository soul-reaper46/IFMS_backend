// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');  // For generating JWT tokens

const authController = {};

// Login user
authController.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exists
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Validate the password (compare plain text password)
    if (password !== user.UserPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '12h' });

    // 4. Send the response with the token
    return res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Signup function
authController.signupUser = async (req, res) => {
    const { name, email, newpassword, phone, dob, riskprofile } = req.body;
  
    if (!name || !email || !newpassword || !phone || !dob) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findByEmail(email);
  
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
      }
  
      // Create a new user
      await User.create(name, email, newpassword, phone, dob, riskprofile);
  
      // Generate a JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Respond with success and token
      res.status(201).json({
        message: 'Signup successful',
        token,
      });
    } catch (error) {
      console.error('Signup failed:', error.message);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
};

module.exports = authController;
