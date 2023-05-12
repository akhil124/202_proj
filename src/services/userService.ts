import axios from "axios";

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const createUserWithEmailAndPassword = async (user: any) => {
  try {
    const res = await axios.post("/user/create", user);
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (user: any) => {
  try {
    const res = await axios.put("/user/update", user);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (email: string) => {
  try {
    const res = await axios.delete(`/user/delete/${email}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const subscribe = async (userid, subscriptionid) => {
  try {
    const res = await axios.post("/user/subscribe", { userid, subscriptionid });
    return res;
  } catch (err) {
    throw err;
  }
};

export const upgradeSubscribtion = async (userid, subscriptionid) => {
  try {
    const res = await axios.post("/user/upgrade-subscribe", {
      userid,
      subscriptionid,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const userCheckin = async (userId, date, checkIn) => {
  try {
    const res = await axios.post("/user/checkin", { userId, date, checkIn });
    return res;
  } catch (err) {
    throw err;
  }
};

export const userCheckout = async (userId, date, checkOut) => {
  try {
    const res = await axios.post("/user/checkout", { userId, date, checkOut });
    return res;
  } catch (err) {
    throw err;
  }
};
