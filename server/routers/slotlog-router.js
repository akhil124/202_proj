import express from "express";
import { addUserToSlotBooking, findUsersinASlot, removeUserFromSlot } from "../domain/slotlog-domain.js";

const router = express.Router();

//AddUserToASlot
router.post("/add-user", async (req, res) => {
  try {
    const { date, activityname, slotid, userid } = req.body;
    const slots = await addUserToSlotBooking(
      date,
      activityname,
      slotid,
      userid
    );
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get Users for a slot
router.get("/user-list", async (req, res) => {
  try {
    const { date, activityname, slotid } = req.body;
    const users = await findUsersinASlot(
      date,
      activityname,
      slotid,
    );
    console.log('user', users)
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//Remove Users for a slot
router.post("/remove-user", async (req, res) => {
  try {
    const { date, activityname, slotid, userid } = req.body;
    const users = await removeUserFromSlot(
      date,
      activityname,
      slotid,
      userid
    );
    console.log('user', users)
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
export default router;
