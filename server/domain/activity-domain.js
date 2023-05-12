import e from "express";
import ActivityModel from "../models/activityModel.js";
import { findUsersinASlot } from "./slotlog-domain.js";
import SlotLogModel from "../models/slotLogModel.js";

export const getAllActivitySlots = async (location) => {
  try {
    const query = { "location.city_name": location };
    const data = await ActivityModel.find(query);
    if (!data) {
      throw Error("Unable to fetch the slots");
    }
    const slots = data?.map((activity) => {
      activity.location = activity?.location.filter((loc) => {
        return loc.city_name === location;
      });
      return {
        name: activity?.name,
        slots: activity?.location?.[0]?.slots,
      };
    });
    if (slots.length == 0) {
      throw Error(`No slots found for ${location}`);
    }
    return slots;
  } catch (error) {
    throw error;
  }
};

export const getActivitySlots = async (activityName, location, date) => {
  try {
    const query = { name: activityName, "location.city_name": location };
    const data = await ActivityModel.find(query);
    if (!data) {
      throw Error("Unable to fetch the slots");
    }
    const slots = data.map((activity) => {
      activity.location = activity?.location.filter((loc) => {
        return loc.city_name === location;
      });
      return { name: activity?.name, slots: activity?.location?.[0]?.slots };
    })?.[0];

    if (!slots) {
      throw Error("Unable to fetch the slots for the location");
    }

    if (slots.length == 0) {
      throw Error(`No slots found for the ${activityName} in ${location}`);
    }
    const newSlots = [];
    for (const slot of slots.slots) {
      const users = await findUsersinASlot(date, activityName, slot.id);
      if (users) {
        newSlots.push({
          _id: slot._id,
          id: slot.id,
          start_time: slot.start_time,
          capacity: slot.capacity,
          occupied: users?.usersBooked?.length || 0,
          available: slot.capacity - (users?.usersBooked?.length || 0) > 0,
          users: users?.usersBooked,
        });
      }
    }

    return { ...slots, slots: newSlots };
  } catch (error) {
    return error;
  }
};

const createActivity = async (activity) => {
  // console.log("createLocation", activity);

  try {
    const newActivity = new ActivityModel(activity);
    const data = await newActivity.save();
    if (!data) {
      throw Error("Unable to create activity");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//Create location for an activity by activity name and location
//if activity is not present, create a new activity
export const createLocation = async (activityName, location) => {
  // console.log("createLocation", activityName, location);

  try {
    const query = { name: activityName };
    const activity = await ActivityModel.findOne(query);
    if (!activity) {
      const newActivity = await createActivity({
        name: activityName,
        location: [
          {
            city_name: location,
            slots: [],
          },
        ],
      });
      return newActivity;
    }
    const newLocation = activity.location.push({
      city_name: location,
      slots: [],
    });
    const data = await activity.save();
    if (!data) {
      throw Error("Unable to create location");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const updateSlot = async (activity, location, slot) => {
  // console.log("update", slot);

  try {
    //Match the location in the activity? and update the slots
    activity.location = activity.location.map((loc) => {
      if (loc.city_name === location) {
        const exists = loc.slots.some((s) => {
          return s.id === slot.id;
        });
        if (exists) {
          throw Error("Slot already exists");
        }
        if (loc.slots?.length > 0) {
          loc.slots.push(slot);
        } else {
          loc.slots = [slot];
        }
      }
      return loc;
    });
    const data = await activity.save();
    if (!data) {
      throw Error("Unable to update slot");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

//Create a slot for an activity by activity name and location and slot
//if location is not present, create a new location
export const createSlot = async (activityName, location, slot) => {
  // console.log("createSlot", activityName, location, slot);
  try {
    const query = {
      name: activityName,
      "location.city_name": location,
    };
    const activity = await ActivityModel.findOne(query);
    let newActivity = activity;
    if (!activity) {
      newActivity = await createLocation(activityName, location);
    }
    const slot_id = location?.slice(0, 3).toUpperCase() + slot.start_time;
    const newSlot = {
      id: slot_id,
      start_time: slot.start_time,
      capacity: slot?.capacity || 0,
    };
    const data = await updateSlot(newActivity, location, newSlot);
    if (!data) {
      throw Error("Unable to create slot");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
