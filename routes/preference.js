import express from 'express';
import { addPreferences } from '../controllers/preferences.js';

const router = express.Router();

router.post('/add', addPreferences);

export default router;
