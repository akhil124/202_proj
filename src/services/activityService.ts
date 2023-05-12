import axios from "axios";
//Create activity
export const createActivity = async (activity: any) => {
  try {
    const res = await axios.post("/activities/create", activity);
    return res;
  } catch (err) {
    throw err;
  }
};

//get all activities
export const getAllActivities = async () => {
  try {
    const res = await axios.get("/activities");
    return res?.data;
  } catch (err) {
    throw err;
  }
};

//get activities by locaiton
export const getActivitiesByLocation = async (location: string) => {
  try {
    const res = await axios.get(`/activities/location/${location}`);
    return res?.data;
  } catch (err) {
    throw err;
  }
};

