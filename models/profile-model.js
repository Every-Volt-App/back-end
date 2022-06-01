const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    profileImage: String,
    primaryCar: {
      make: String,
      model: String,
      connectionType: String,
    },
    primaryAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: {
        type: String,
        min: 2,
        max: 2,
      },
      zipcode: {
        type: Number,
        min: 5,
        max: 5,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
