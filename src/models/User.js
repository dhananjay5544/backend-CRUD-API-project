const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const userSchema = new Schema(
  {
    email: requiredString,
    password: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    mobileNo: requiredNumber,
    verified: { type: Boolean, default: false },
    emailConfirmed: { type: Boolean, default: false },
    userType: requiredNumber,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", userSchema);

module.exports = Users;
