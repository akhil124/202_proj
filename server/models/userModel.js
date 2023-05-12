import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, },
  password: { type: String, required: true, trim: true },
  firstName: { type: String, trim: true, },
  lastName: { type: String, trim: true, },
  dateOfBirth: { type: Date },
  gender: { type: String, trim: true, },
  phone: { type: String, trim: true, },
  address: { type: String, trim: true, },
  city: { type: String, trim: true, },
  state: { type: String, trim: true, },
  country: { type: String, trim: true, },
  zip: { type: String, trim: true, },
  role: { type: String, trim: true, default: 'non-member'},
  activeSubscriptions: {
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
      validFrom: { type: Date, default: Date.now },
      validTo: { type: Date },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
