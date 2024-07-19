import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Debug: Print environment variables to verify they are loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('WEATHER_API_KEY:', process.env.WEATHER_API_KEY);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use the user routes
app.use('/api/v1', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

