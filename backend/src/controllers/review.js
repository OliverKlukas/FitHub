"use strict";

const UserModel = require("../models/user");

/**
 *
 * @param {*} req Int 1-5 Star, String text, ContentCreatorID in params, userId/creatorId added by middleware
 * @param {*} res
 * @returns
 */
const addreview = async (req, res) => {
  try {
    const ratedUserId = req.params.id;
    const ratedUser = await UserModel.findById(ratedUserId).exec();
    let counter = ratedUser.newReviewsCounter;
    counter++;

    // find a Content Creator that has the id and is reviewed by the user
    // returns null if the user has not reviewed this Content Creator
    let alreadyratedUser = await UserModel.findOne({
      _id: ratedUserId,
      "reviews.creatorId": req.userId,
    });

    // Update the newNotificationCounter
    await UserModel.findByIdAndUpdate(
      ratedUserId,
      {newReviewsCounter: counter,},
      {
      new: true,
      runValidators: true,
    }).exec();

    // check if user has already reviewed this Content Creator
    if (alreadyratedUser !== null) {
      // if the user has already reviewed update his review 
      await UserModel.updateOne(
        {
          _id: ratedUserId,
          "reviews.creatorId": req.userId,
        },
        {
          $set: {
            "reviews.$.creatorId": req.userId,
            "reviews.$.star": req.body.star,
            "reviews.$.text": req.body.text,
          },
        }
      );
      res.status(200).json({
        message: "Updated Review",
      });
    } else {
      // if the user has not reviewed create a new star entry
      let review = {
        creatorId: req.userId,
        star: req.body.star,
        text: req.body.text,
      };
      await UserModel.findByIdAndUpdate(ratedUserId, {
        $push: { reviews: review },
      });
      return res.status(200).json({
        review,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

/**
 * deletes review
 * @param {*} req userId comes from middleware
 * @param {*} res 
 * @returns 
 */
const deletereview = (req, res) => {
  try {
    UserModel.findOneAndDelete({
      creatorId: req.userId,
    });
    return res.status(200).json({
      message: "Succesfully deleted Review",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server error",
      message: error.message,
    });
  }
};
 
module.exports = {
  addreview,
  deletereview,
};