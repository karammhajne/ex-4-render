import express from 'express';
import { calculateVacation } from '../controllers/vacation.js';

const router = express.Router();

router.post('/calculate', calculateVacation);

export default router;
