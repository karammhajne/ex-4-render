const User = require('../models/user');
const Preferences = require('../models/preferences');
const jwt = require('jsonwebtoken');

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

exports.getUserPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.find();
    res.status(200).json({ success: true, data: preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get preferences' });
  }
};

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
    res.status 500).json({ success: false, error: 'Failed to set preferences' });
  }
};

const fs = require('fs');
const path = require('path');

exports.getVacationOptions = (req, res) => {
  const filePath = path.join(__dirname, '../vacationOptions.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Failed to read vacation options' });
    }
    res.status(200).json({ success: true, data: JSON.parse(data) });
  });
};
