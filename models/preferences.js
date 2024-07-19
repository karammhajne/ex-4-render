import mongoose from 'mongoose';

const preferencesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: String, required: true },
  vacationType: { type: String, required: true }
});

export default mongoose.model('Preferences', preferencesSchema);

