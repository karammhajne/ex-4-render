import Preferences from '../models/preferences.js';
import User from '../models/user.js';

export const addPreferences = async (req, res) => {
  const { userID, startDate, endDate, destination, vacationType } = req.body;
  try {
    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const preferences = await Preferences.create({
      userID,
      startDate,
      endDate,
      destination,
      vacationType
    });
    res.status(201).json({ success: true, data: preferences });
  } catch (error) {
    console.error('Error adding preferences:', error.message);  // Log the detailed error message
    console.error('Error details:', error);  // Log the entire error object for more details
    res.status(400).json({ success: false, error: 'Failed to add preferences', message: error.message });
  }
};
