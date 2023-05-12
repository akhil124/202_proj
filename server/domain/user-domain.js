import SlotLogModel from "../models/slotLogModel.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import SubscriptionModel from "../models/subscriptionModel.js";

//Create User
async function createUser(userDetails) {
  try {
    const user = await UserModel.findOne({ email: userDetails.email });
    if (user) {
      throw Error("User already exists with same email");
    }
    const newUser = new UserModel(userDetails);
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw error;
  }
}

//Validate User
async function validateUser(email, password) {
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw Error("Invalid password");
    }
    const token = jwt.sign({ email: user.email }, "secret");
    return { ...user?._doc, token };
  } catch (error) {
    throw error;
  }
}

//Update User
async function updateUser(userDetails) {
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: userDetails.email },
      { $set: userDetails },
      { new: true }
    );
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

//Delte User
async function deleteUser(email) {
  try {
    const user = await UserModel.findOneAndDelete({ email: email });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

//Get All Users
async function getAllUsers() {
  try {
    const users = await UserModel.find();
    if (!users) {
      throw Error("Error retrieving users");
    }
    return users;
  } catch (error) {
    throw Error(error);
  }
}


//Get User Bookings
async function getUserBookings(userid) {
  try {
    const slotBookings = await SlotLogModel.find({ usersBooked: userid });
    if (!slotBookings) {
      throw Error("Error retrieving slot bookings");
    }
    return slotBookings;
  } catch (error) {
    throw Error(error);
  }
}

//Buy Membership
async function subscribeUser(userSubscribeDetails) {
  try {
    const user = await UserModel.findById(userSubscribeDetails.userid);
    if (!user) {
      throw Error("User not found");
    }
    const subscription = await SubscriptionModel.findById(
      userSubscribeDetails.subscriptionid
    );
    if (!subscription) {
      throw Error("Subscription not found");
    }
    const TODAY = new Date();
    if (user?.activeSubscriptions?.validTo > TODAY) {
      throw Error("User currently has an active subscription");
    }
    user.activeSubscriptions = {
      id: subscription._id,
      validFrom: TODAY,
      validTo: new Date(Date.now() + subscription?.validity * 86400000),
    };
    user.role = "member";
    const res = await user.save();
    return res;
  } catch (error) {
    throw Error(error);
  }
}

//Upgrade Membership
async function upgradeSubscription(userSubscribeDetails) {
  try {
    const user = await UserModel.findById(userSubscribeDetails.userid);
    if (!user) {
      throw Error("User not found");
    }
    const subscription = await SubscriptionModel.findById(
      userSubscribeDetails.subscriptionid
    );
    if (!subscription) {
      throw Error("Subscription not found");
    }
    const TODAY = new Date();
    user.activeSubscriptions = {
      id: subscription._id,
      validFrom: TODAY,
      validTo: new Date(Date.now() + subscription?.validity * 86400000),
    };
    user.role = "member";
    const res = await user.save();
    return res;
  } catch (error) {
    throw Error(error);
  }
}
export {
  getUserBookings,
  validateUser,
  createUser,
  updateUser,
  subscribeUser,
  upgradeSubscription,
  deleteUser,
  getAllUsers,
};
