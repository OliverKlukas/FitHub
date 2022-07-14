/* eslint-disable prettier/prettier */
"use strict";

const mongoose = require("mongoose");

// this is that the later created virtuals are included in the json send to the user
const opts = { toJSON: { virtuals: true } };

const ReviewSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" }, //User who gave the review
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
const UserSchema = new mongoose.Schema(
  {
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
    newReviewsCounter: {
      type: Number,
    },
    newMessagesCounter: {
      type: Number,
    },
    reviews: [ReviewSchema],
  },
  opts
);

UserSchema.set("versionKey", false);
ReviewSchema.set("versionKey", false);

UserSchema.virtual("avgReviewRating").get(function () {
  let avgstar = 0;
  let stars = 0;
  // if there are no stars return 0
  if (this.reviews.length === 0) {
    return 0;
  }
  this.reviews.map((star) => {
    if (typeof star.star === "number") {
      avgstar += star.star;
    }
    stars++;
  });
  avgstar = avgstar / stars;
  return avgstar;
});

UserSchema.virtual("gradingDistribution").get(function () {
  let onestar = 0;
  let twostar = 0;
  let threestar = 0;
  let fourstar = 0;
  let fivestar = 0;
  if (this.reviews.length === 0) {
    return [
      { name: 1, amount: 0 },
      { name: 2, amount: 0 },
      { name: 3, amount: 0 },
      { name: 4, amount: 0 },
      { name: 5, amount: 0 },
    ];
  }
  this.reviews.map((star) => {
    if (typeof star.star === "number") {
      if (star.star === 1) {
        onestar++;
      } else if (star.star === 2) {
        twostar++;
      } else if (star.star === 3) {
        threestar++;
      } else if (star.star === 4) {
        fourstar++;
      } else if (star.star === 5) {
        fivestar++;
      }
    }
  });
  return [
    { name: 1, amount: onestar },
    { name: 2, amount: twostar },
    { name: 3, amount: threestar },
    { name: 4, amount: fourstar },
    { name: 5, amount: fivestar },
  ];
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
