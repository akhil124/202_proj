import mongoose from "mongoose";

const SlotLogSchema = new mongoose.Schema({
  activityname: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  slotId: { type: String, required: true },
  usersBooked: [{ type: String, required: true }],
});

const SlotLogModel = mongoose.model("SlotLog", SlotLogSchema);

export default SlotLogModel;
