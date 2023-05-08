import SlotLogModel from "../models/slotLogModel.js";

async function addUserToSlotBooking(date, activityname, slotId, user) {
  try {
    let result;
    const slotBooking = await SlotLogModel.findOne({
      activityname,
      date,
      slotId,
    });
    if (slotBooking) {
      // If document exists, check if user is already in array, and add user if not
      if (!slotBooking.usersBooked.includes(user)) {
        slotBooking.usersBooked.push(user);
        result = await slotBooking.save();
      } else {
        throw Error(
          `User ${user} already booked for slot ${slotId} on ${date}`
        );
      }
    } else {
      const newSlotBooking = new SlotLogModel({
        activityname,
        date,
        slotId,
        usersBooked: [user],
      });
      result = await newSlotBooking.save();
    }
    if (!result) {
      throw Error("Failed to book a slot");
    }
    return result;
  } catch (error) {
    throw error;
  }
}

async function findUsersinASlot(date, activityname, slotId) {
  try {
    let result;
    const slotBooking = await SlotLogModel.findOne({
      activityname,
      date,
      slotId,
    });
    if (slotBooking) {
      return slotBooking;
    }
    return [];
  } catch (error) {
    throw error;
  }
}

async function removeUserFromSlot(date, activityname, slotId, user) {
  try {
    let result;
    const slotBooking = await SlotLogModel.findOne({
      activityname,
      date,
      slotId,
    });
    if (slotBooking) {
      if (slotBooking.usersBooked.includes(user)) {
        slotBooking.usersBooked = slotBooking.usersBooked.filter(function (
          item
        ) {
          return item !== user;
        });
        result = await slotBooking.save();
      } else {
        throw Error(`User not found in the slot list`);
      }
    } else {
      throw Error("Unable to find slot");
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export { addUserToSlotBooking, findUsersinASlot, removeUserFromSlot };
