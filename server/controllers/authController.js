const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const { JWT_SECRET } = process.env;

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is suspended' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Update last login
    user.lastLogin = Date.now();
    await user.save();
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user (client-side operation, but can add token invalidation if needed)
exports.logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    const { username, email, password, role, firstName, lastName } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      console.error('Missing required fields:', { username, email, password });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: {
          username: !username ? 'Missing' : 'Provided',
          email: !email ? 'Missing' : 'Provided',
          password: !password ? 'Missing' : 'Provided'
        }
      });
    }
    
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('User already exists:', existingUser);
      return res.status(400).json({ 
        message: 'Username or email already exists',
        conflict: {
          usernameExists: existingUser.username === username,
          emailExists: existingUser.email === email
        }
      });
    }
    
    console.log('Creating new user...');
    const newUser = new User({
      username,
      email,
      password,
      role: role || 'homeowner'
    });
    
    await newUser.save();
    console.log('User created:', newUser);
    
    console.log('Creating profile...');
    const newProfile = new Profile({
      user: newUser._id,
      firstName: firstName || '',
      lastName: lastName || ''
    });
    
    await newProfile.save();
    console.log('Profile created:', newProfile);
    
    console.log('Generating token...');
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    console.log('Registration successful');
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
    
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      stack: error.stack,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
    });
    
    res.status(500).json({ 
      message: 'Server error',
      errorDetails: {
        name: error.name,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      }
    });
  }
};