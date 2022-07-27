"use Strict";

const ContentModel = require("../models/content");

/**
 * Returns list of all content in database.
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const list = async (req, res) => {
  try {
    const contents = await ContentModel.find({}).exec();
    return res.status(200).json(contents);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

/**
 * Creates a new content item in database.
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const create = async (req, res) => {
  // Check if the body of the request is not empty.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // Handle the given content creation request.
  try {
    // Create content in database with supplied request body.
    const content = await ContentModel.create(req.body);

    // Return success status with created content as json.
    return res.status(201).json(content);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error:" + err.message,
    });
  }
};

/**
 * Updates content item in database.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const update = async (req, res) => {
  // Check if the body of the request is not empty.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update content with id
    let content = await ContentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    // return updated content
    return res.status(200).json(content);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

/**
 * Removes item in database.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const remove = async (req, res) => {
  try {
    // find and remove content
    await ContentModel.findByIdAndRemove(req.params.id).exec();

    // return message that content was deleted
    return res
      .status(200)
      .json({ message: `Content with id${req.params.id} was deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

/**
 * Retrieves item in database.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const get = async (req, res) => {
  try {
    // get content with id from database
    let content = await ContentModel.findById(req.params.id).exec();

    // if no content with id is found, return 404
    if (!content)
      return res.status(404).json({
        error: "Not Found",
        message: "Content not found",
      });

    // return gotten content
    return res.status(200).json(content);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

/**
 * returns a list of all the content a user has uploaded
 * @param {*} req userId added by middleware
 * @param {*} res 
 * @returns 
 */
const getMyContent = async (req, res) => {
  try {
    const contents = await ContentModel.find({}).exec();
    const mycontents = [];

    contents.map((item) => {
      if (item.ownerId == req.userId) {
        mycontents.push(item);
      }
    });

    return res.status(200).json({
      ownContent: mycontents,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error: " + err.message,
    });
  }
};

module.exports = {
  create,
  list,
  get,
  update,
  remove,
  getMyContent,
};
