import CheckinModel from "../models/checkinSchema.js";

export const userCheckin = async (userId, date, checkIn) => {
  try {
    const checkin = new CheckinModel({
      user: userId,
      date,
      checkin: checkIn,
    });
    const exists = await CheckinModel.findOne({
      user: userId,
      date,
    });
    if (exists) {
      throw new Error("Checkin already exists");
    }
    await checkin.save();
    return checkin;
  } catch (e) {
    throw e;
  }
};

export const userCheckout = async (userId, date, checkOut) => {
  try {
    const checkin = await CheckinModel.findOne({
      user: userId,
      date,
    });
    if (!checkin) {
      throw new Error("Checkin not found");
    }
    checkin.checkout = checkOut;
    await checkin.save();
    return checkin;
  } catch (e) {
    throw e;
  }
};
