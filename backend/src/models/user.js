/* eslint-disable prettier/prettier */
"use strict";

const mongoose = require("mongoose");

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
  // opts // needed for calculated fields like the amount of stars if we want to backend calculate thes
});

UserSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
