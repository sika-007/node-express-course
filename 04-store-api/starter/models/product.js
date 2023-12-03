const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating Cannot be more than 5"],
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  name: {
    type: String,
    required: [true, "Product name must be provided"],
    trim: true,
    minlength: [2, "Name cannot have less than 2 characters"],
    maxlength: [30, "Name cannot have more than 30 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price must be provided"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("product", productSchema);
