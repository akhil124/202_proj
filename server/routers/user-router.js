import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserBookings,
  subscribeUser,
  updateUser,
  upgradeSubscription,
  validateUser,
} from "../domain/user-domain.js";
import { userCheckin, userCheckout } from "../domain/checking-domain.js";

const router = express.Router();

//Create User
router.post("/create", async (req, res) => {
  try {
    const userDetails = req.body;
    const data = await createUser(userDetails);
    return res.json({
      status: "Success",
      message: "User created succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await validateUser(email, password);
    return res.json({
      status: "Success",
      message: "User created succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Update User
router.put("/update", async (req, res) => {
  try {
    const userDetails = req.body;
    const data = await updateUser(userDetails);
    return res.json({
      status: "Success",
      message: "User updated succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Delete User
router.delete("/delete/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = await deleteUser(email);
    return res.json({
      status: "Success",
      message: "User deleted succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get All users
router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      status: "SUCCESS",

      message: "Fetched Succesfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//Get slots for a user
router.get("/slot/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const slots = await getUserBookings(userid);
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/subscribe", async (req, res) => {
  try {
    const userSubscribeDetails = req.body;
    const result = await subscribeUser(userSubscribeDetails);
    res.json({
      status: "SUCCESS",
      message: "Subscribed Succesfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/upgrade-subscribe", async (req, res) => {
  try {
    const userSubscribeDetails = req.body;
    const result = await upgradeSubscription(userSubscribeDetails);
    res.json({
      status: "SUCCESS",
      message: "Subscribed Succesfully",
      data: result,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Checkin User
router.post("/checkin", async (req, res) => {
  try {
    const { userId, date, checkIn } = req.body;
    const checkin = await userCheckin(userId, date, checkIn);
    res.json({
      status: "SUCCESS",
      message: "Check in Succesfully",
      data: checkin,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Checkout User
router.post("/checkout", async (req, res) => {
  try {
    const { userId, date, checkOut } = req.body;
    const checkin = await userCheckout(userId, date, checkOut);
    res.json({
      status: "SUCCESS",
      message: "Check out Succesfully",
      data: checkin,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
