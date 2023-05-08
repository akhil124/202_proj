import express  from "express";
import { createSubscription, deleteSubscription, getAllSubscriptions, updateSubscription } from "../domain/subscriptions-domain.js";

const router = express.Router();


router.get('/all', async (req, res) => {
  try{
    const data = await getAllSubscriptions();
    return res.json({
      status: 'Success',
      message: "Subscription created succesfully",
      data: data
    })
  }
  catch(error){
    res.status(400).send(error.message);
  }
});

router.post('/create', async (req, res) => {
  try{
    const subscriptionDetails = req.body;
    const data = await createSubscription(subscriptionDetails);
    return res.json({
      status: 'Success',
      message: "Subscription created succesfully",
      data: data
    })
  }
  catch(error){
    res.status(400).send(error.message);
  }
});

router.put('/update', async (req, res) => {
  try{
    const subscriptionDetails = req.body;
    const data = await updateSubscription(subscriptionDetails);
    return res.json({
      status: 'Success',
      message: "Subscription updated succesfully",
      data: data
    })
  }
  catch(error){
    res.status(400).send(error.message);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const data = await deleteSubscription(id);
    return res.json({
      status: 'Success',
      message: "Subscription deleted succesfully",
      data: data
    })
  }
  catch(error){
    res.status(400).send(error.message);
  }
})

export default router;