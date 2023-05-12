import axios from "axios";

export const bookSlot = async (
  slotId: string,
  userId: string,
  date: Date,
  activityname: string
) => {
  try {
    const res = await axios.post("/slot/add-user", {
      date: date,
      activityname: activityname,
      slotid: slotId,
      userid: userId,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getUserSlotsByDate = async (date: Date, userId: string) => {
  try {
    const res = await axios.get(`/slot/get-user-slots/${userId}/${date}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

//Remove user from slot
export const removeUserFromSlot = async (
  date: Date,
  activityname: string,
  slotId: string,
  userId: string
) => {
  try {
    const res = await axios.delete(`/slot/remove-user`, {
      data: {
        date: date,
        activityname: activityname,
        slotid: slotId,
        userid: userId,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
