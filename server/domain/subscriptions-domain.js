import SubscriptionModel from "../models/subscriptionModel.js";

//Fetch All subscriptions
async function getAllSubscriptions() {
  try {
    const subscription = await SubscriptionModel.find();
    if (!subscription) {
      throw Error("No subscriptions");
    }
    return subscription;
  } catch (error) {
    throw error;
  }
}

//Create Subscription
async function createSubscription(subscriptionDetails) {
  try {
    const subscription = await SubscriptionModel.findOne({
      _id: subscriptionDetails._id,
    });
    if (subscription) {
      throw Error("Subscription already exists with same email");
    }
    const newSubscription = new SubscriptionModel(subscriptionDetails);
    const result = await newSubscription.save();
    return result;
  } catch (error) {
    throw error;
  }
}

//Login Subscription
async function updateSubscription(subscriptionDetails) {
  try {
    const subscription = await SubscriptionModel.findByIdAndUpdate(
      subscriptionDetails._id,
      { $set: subscriptionDetails },
      { new: true }
    );
    if (!subscription) {
      throw Error("Subscription not found");
    }
    return subscription;
  } catch (error) {
    throw error;
  }
}

async function deleteSubscription(subscriptionid) {
  try {
    const slotBookings = await SubscriptionModel.findByIdAndRemove(
      subscriptionid
    );
    if (!slotBookings) {
      throw Error("Subscription does not exist");
    }
    return slotBookings;
  } catch (error) {
    throw Error(error);
  }
}

export {
  getAllSubscriptions,
  deleteSubscription,
  createSubscription,
  updateSubscription,
};
