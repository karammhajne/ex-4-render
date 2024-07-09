const express = require('express');
const { registerUser, loginUser, getUserPreferences, setUserPreferences } = require('../controllers/user');
const { calculateVacation } = require('../controllers/vacation');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/preferences', getUserPreferences);
router.post('/preferences', setUserPreferences);
router.get('/calculate', calculateVacation);

module.exports = router;
