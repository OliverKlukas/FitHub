"use strict";

const mongoose = require("mongoose");

/**
 * Defines schema for fitness, nutrition and coaching content.
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any, {}, DefaultTypeKey, {title: {type: StringConstructor, required: boolean}}>}
 */
const ContentSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
    }
)

module.exports = mongoose.model("Content", ContentSchema);
