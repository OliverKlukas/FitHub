"use Strict";

const ContentModel = require("../models/content");

/**
 * Returns list of all content in database.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const list = async (req, res) => {
  try {
    let contents = await ContentModel.find({}).exec();
    return res.status(200).json(contents);
  } catch (err) {
    console.log(err);
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
 * @returns {Promise<*>}
 */
const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });

  // handle the request
  try {
    // create content in database
    let content = await ContentModel.create(req.body);

    // return created movie
    return res.status(201).json(content);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  list,
};
