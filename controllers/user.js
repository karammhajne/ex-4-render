const User = require('../models/user');
const jwt = require('jsonwebtoken');

// פונקציית רישום משתמש חדש
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({
      success: true,
      data: user,
      accessToken: user.getSignedJwtToken()
    });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to register user' });
  }
};

// פונקציית התחברות
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    res.status(200).json({
      success: true,
      data: user,
      accessToken: user.getSignedJwtToken()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to login user' });
  }
};

// פונקציית קבלת העדפות משתמשים
exports.getUserPreferences = async (req, res) => {
  // למימוש
};

// פונקציית עריכת העדפות משתמשים
exports.setUserPreferences = async (req, res) => {
  // למימוש
};


const Preferences = require('../models/preferences');

// פונקציית קבלת העדפות משתמשים
exports.getUserPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.find();
    res.status(200).json({ success: true, data: preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get preferences' });
  }
};

// פונקציית עריכת העדפות משתמשים
exports.setUserPreferences = async (req, res) => {
  const { userId, startDate, endDate, destination, vacationType } = req.body;
  try {
    const preferences = await Preferences.findOneAndUpdate(
      { user: userId },
      { startDate, endDate, destination, vacationType },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to set preferences' });
  }
};
