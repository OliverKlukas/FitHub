"use Strict";

const config = require("../config");
const ContentModel = require("../models/content");

// Method Untested, likely errors, basic structure and body checking should be fine
const uploadContent = async (req, res) => {
  // check request body for required Content
  if (!Object.prototype.hasOwnProperty.call(req.body, "contentId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a contentId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "userId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a userId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "category")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a category property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "title")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a title property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "price")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a price property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "img")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a img property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "duration")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a duration property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "intensity")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a intensity property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "fullSupport")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a fullSupport property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "tags")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a tags property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "plans")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a plans property",
    });
  }
  try {
    const content = {
      contentId: req.body.contentId,
      userId: req.body.userId,
      category: req.body.category,
      title: req.body.title,
      price: req.body.price,
      img: req.body.img,
      duration: req.body.duration,
      intensity: req.body.intensity,
      fullSupport: req.body.fullSupport,
      tags: req.body.tags,
      plans: req.body.plans,
    };

    const retContent = await ContentModel.findOne({
      contentId: req.body.contentId,
    }).create(content);
    return res.status(200).json({
      retContent,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// untested, likely errors, needs both contentID, to find content and userID, to check if allowed to delete(maybe add a "admin delete as well?")
const deleteContent = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "contentId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a contentId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "userId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a userId property",
    });
  }
  try {
    const content = await ContentModel.findOne({
      contentId: req.body.contentId,
    });

    if (content.userId === req.body.contentID) {
      await ContentModel.findByIdAndRemove(req.body.contentId).exec();
      return res.status(200).json({
        message: "Content with Id${req.body.contentId} was deleted",
      });
    } else {
      return res.status(401).json({
        message: "Not the Creator",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// untested, likely errors, needs just a contentId, since everyone can request these details, this call is for all areas where content details are displayed, does not
// return the plan pdfs
const accessContentDetails = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "contentId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a contentId property",
    });
  }
  try {
    const content = await ContentModel.findOne({
      contentId: req.body.contentID,
    });
    return res.status(200).json({
      contentId: content.contentId,
      title: content.title,
      category: content.category,
      userId: content.userId,
      price: content.price,
      img: content.img,
      duration: content.duration,
      intensity: content.intensity,
      fullSupport: content.fullSupport,
      tags: content.tags,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// untested, likely errors, needs contentId to find content, a boolean of isCreator and a userId since only creator and those that bought this content can access it
const accessBoughtContent = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "contentId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a contentId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "userId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a userId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "isCreator")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a isCreator property",
    });
  }
  try {
    // TODO check whether allowed to access

    const content = await ContentModel.findOne({
      contentId: req.body.contentID,
    });

    return res.status(200).json({
      plans: content.plans,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// untested, likely errors, needs contentId and usedId since only owner (and TODO maybe admin, this could be done with middleware) is allowed to access it
const updateContent = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "contentId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a contentId property",
    });
  }
  if (!Object.prototype.hasOwnProperty.call(req.body, "userId")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a userId property",
    });
  }
  try {
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = {
  uploadContent,
  deleteContent,
  accessContentDetails,
  updateContent,
  accessBoughtContent,
};
