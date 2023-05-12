import express from "express";
import ActivityModel from "../models/activityModel.js";
import {
  createSlot,
  getActivitySlots,
  getAllActivitySlots,
} from "../domain/activity-domain.js";

const router = express.Router();

//Get all activites
router.get("/", (req, res) => {
  ActivityModel.find()
    .then((data) => {
      res.json({
        status: "SUCCESS",
        message: "Fetched Succesfully",
        data: data,
      });
    })
    .catch((err) => {
      res.send(500, err);
    });
});

//Get all activities by location
router.get("/location/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const slots = await getAllActivitySlots(location);
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Get slots of an activity by location by date
router.post("/:activity/location/:location/slots", async (req, res) => {
  try {
    const activity = req.params.activity;
    const location = req.params.location;
    const { date = new Date()} = req.body;
    const slots = await getActivitySlots(activity, location, date);
    res.json({
      status: "SUCCESS",
      message: "Fetched Succesfully",
      data: slots,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Create a new activity
router.post("/create", async (req, res) => {
  const {activityName, location, slot} = req.body;
  try{
    const data = await createSlot(activityName, location, slot);
    res.json({
      status: "SUCCESS",
      message: "Slot created Succesfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);

  }
});

export default router;
