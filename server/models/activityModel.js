import mongoose from "mongoose";

const activity = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: [{ city_name: String, slots: [{id:String, start_time: String, capacity: Number}] }],
    required: true,
    trim: true,
  },
});

const ActivityModel = mongoose.model("Activity", activity);

export default ActivityModel;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define Activity Schema
// const activitySchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   slots: {
//     type: [String],
//     required: true
//   }
// });

// // Define Center Schema
// const centerSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   activities: {
//     type: [activitySchema],
//     required: true
//   }
// });

// // Define City Schema
// const citySchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   centers: {
//     type: [centerSchema],
//     required: true
//   }
// });

// module.exports = mongoose.model('City', citySchema);
