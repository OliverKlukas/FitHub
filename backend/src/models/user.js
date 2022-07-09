/* eslint-disable prettier/prettier */
"use strict";

const mongoose = require("mongoose");

// this is that the later created virtuals are included in the json send to the user
const opts = { toJSON: { virtuals: true } };

const ReviewSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  star: {
    type: Number,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
  },
});

// Define the user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  // role of the user
  role: {
    // potentially add a admin role for "Employees"
    type: String,
    // role can only take the values "customer" and "contentCreator"
    enum: ["customer", "contentCreator"],
    // if not specified the role "customer" is chosen
    default: "customer",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  reviews: [ReviewSchema],

  },
  opts
);

UserSchema.set("versionKey", false);
ReviewSchema.set("versionKey", false);

UserSchema.virtual("avgReviewRating").get(function () {
  let avgRating = 0;
  let ratings = 0;
  // if there are no ratings return 0
  if (this.reviews.length === 0) {
    return 0;
  }
  this.reviews.map((rating) => {
    if (typeof rating.rating === "number") {
      avgRating += rating.rating;
    }
    ratings++;
  });
  avgRating = avgRating / ratings;
  return avgRating;
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
