import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: String, required: true},
  price: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  most_popular: {type: Boolean, required: true, default: false},
  description: {type: String},
  validity: { type: Number, required: true },
});

const SubscriptionModel = mongoose.model('subscription', subscriptionSchema);

export default SubscriptionModel;