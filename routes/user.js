import express from 'express';
import { registerUser, loginUser, getUserPreferences, setUserPreferences } from '../controllers/user.js';
import { calculateVacation } from '../controllers/vacation.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/preferences', getUserPreferences);
router.post('/preferences', setUserPreferences);
router.get('/calculate', calculateVacation);

export default router;



