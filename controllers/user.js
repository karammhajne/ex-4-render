import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import Preferences from '../models/preferences.js';

export const registerUsers = async (req, res) => {
  const users = req.body.users;
  try {
    const registeredUsers = await User.insertMany(users);
    const accessTokens = registeredUsers.map(user => user.getSignedJwtToken());
    res.status(201).json({
      success: true,
      data: registeredUsers,
      accessTokens
    });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to register users' });
  }
};

export const registerUser = async (req, res) => {
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

export const loginUser = async (req, res) => {
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

export const getUserPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.find();
    res.status(200).json({ success: true, data: preferences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get preferences' });
  }
};

export const setUserPreferences = async (req, res) => {
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
