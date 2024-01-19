const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Pleaser provide company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Pleaser provide position name"],
    maxlength: 100,
  },
  status: {
    type: String,
    emum: {
      values: ["interview", "declined", "pending"],
      message: "{VALUE} is not supported",
    },
  },
});
