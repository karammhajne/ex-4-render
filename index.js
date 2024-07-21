import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import preferencesRoutes from './routes/preferences.js';
import vacationRoutes from './routes/vacation.js';  // Add this line
import sequelize from './models/index.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

sequelize.sync({ force: true })  // Force sync to drop and recreate tables
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error: ' + err));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/preferences', preferencesRoutes);
app.use('/api/v1/vacations', vacationRoutes);  // Add this line

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
