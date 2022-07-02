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
    console.log(err);
    return res.status(500).json({
      error: "Internal server error: " + err.message,
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

module.exports = {
  create,
  list,
};
