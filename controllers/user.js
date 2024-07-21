import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';  // Import UUID library for generating unique values

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAccessCode = uuidv4();  // Generate a unique access code
    const user = await User.create({ userName: username, userPassword: hashedPassword, userAccessCode });
    const token = user.getSignedJwtToken();
    res.status(201).json({
      success: true,
      data: user,
      accessToken: token
    });
  } catch (error) {
    console.error('Error registering user:', error);  // Log the detailed error
    res.status(400).json({ success: false, error: 'Failed to register user', message: error.message, details: error.errors });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { userName: username } });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      data: user,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to login user', message: error.message });
  }
};
