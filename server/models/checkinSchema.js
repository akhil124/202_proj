import mongoose from "mongoose";
const checkinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String },
});

const CheckinModel = mongoose.model('Checkin', checkinSchema);

export default CheckinModel;