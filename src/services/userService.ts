import axios from "axios";

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await axios.post("/user/login", { email, password });
    return res;
  } catch (err) {
    console.log('err', err);
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
