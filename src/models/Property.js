const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};
const defaultNumber = {
  type: Number,
  default: 0,
};

const propertySchema = new Schema(
  {
    username: requiredString,
    password: requiredString,
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
