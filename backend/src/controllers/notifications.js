"use strict";

const UserModel = require("../models/user");

const getNewNotifications = async (req, res) => {
  try {
    const requesteduser = await UserModel.findById(req.userId).exec();

    return res.status(200).json({
      newReviewsCounter: requesteduser.newReviewsCounter,
      newMessagesCounter: requesteduser.newMessagesCounter,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error" + err.message,
    });
  }
};

const cleanReviewCounter = async (req, res) => {
  try {
    UserModel.findByIdAndUpdate(req.userId, 
      {newReviewsCounter: 0}).exec();
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error" + err.message,
    });
  }
};

const cleanMessageCounter = async (req, res) => {
  try {
    UserModel.findByIdAndUpdate(req.userId, 
      {newMessagesCounter: 0}).exec();
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error" + err.message,
    });
  }
}

const increaseMessageCounter = async (req, res) => {
  try {
    messagedUserId = req.params.id
    const messagedUser = await UserModel.findById(messagedUserId);
    let counter = messagedUser.newReviewsCounter;
    counter++;
    await UserModel.findByIdAndUpdate(
      messagedUserId,
      {newMessagesCounter: counter,},
      {
      new: true,
      runValidators: true,
    }).exec();
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error" + err.message,
    });
  }
}

module.exports = {
  getNewNotifications,
  cleanMessageCounter,
  cleanReviewCounter,
  increaseMessageCounter,
};