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
        });
      }
    }
    console.log("slots", newSlots);

    return { ...slots, slots: newSlots };
  } catch (error) {
    return error;
  }
};
