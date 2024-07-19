import Preferences from '../models/preferences.js';
import axios from 'axios';

export const calculateVacation = async (req, res) => {
  try {
    const preferences = await Preferences.find();
    if (preferences.length < 5) {
      return res.status(400).json({ success: false, error: 'Not all preferences are filled' });
    }

    const destination = calculateMajority(preferences.map(p => p.destination));
    const vacationType = calculateMajority(preferences.map(p => p.vacationType));
    const { startDate, endDate } = calculateDateOverlap(preferences);

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.WEATHER_API_KEY}`);
    const weather = weatherResponse.data;

    res.status(200).json({
      success: true,
      data: { startDate, endDate, destination, vacationType, weather }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to calculate vacation' });
  }
};

function calculateMajority(array) {
  const counts = array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

function calculateDateOverlap(preferences) {
  const startDates = preferences.map(p => new Date(p.startDate));
  const endDates = preferences.map(p => new Date(p.endDate));

  const latestStartDate = new Date(Math.max.apply(null, startDates));
  const earliestEndDate = new Date(Math.min.apply(null, endDates));

  if (latestStartDate > earliestEndDate) {
    throw new Error('No overlapping dates');
  }

  return { startDate: latestStartDate, endDate: earliestEndDate };
}


