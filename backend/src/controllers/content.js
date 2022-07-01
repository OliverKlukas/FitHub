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
  // Checks if the body of the request contains all necessary content properties.
  const requiredProps = [
    "ownerId",
    "id",
    "category",
    "title",
    "price",
    "media",
    "duration",
    "intensity",
    "fullSupport",
    "tags",
    "featured",
  ];
  for (const prop in requiredProps) {
    if (!Object.prototype.hasOwnProperty.call(req.body, prop)) {
      return res.status(400).json({
        error: "Bad Request",
        message: `The request body must contain a ${prop} property`,
      });
    }
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
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  list,
};
