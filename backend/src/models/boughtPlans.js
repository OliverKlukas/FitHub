"use strict";

const mongoose = require("mongoose");

/**
 * Defines schema for bought content.
 *
 * Expected to be a JSON of: {
 *     userEMail: email address of user,
 *     contentId: unique identifier of content,
 *     boughtAt: timestamp of buying time,
 * }
 *
 */
const BoughtPlansSchema = new mongoose.Schema({
    userEMail: { type: String, required: true },
    contentId: { type: String, required: true },
    // is set automatically to the current timestamp when payment is completed (default: Date.now)
    boughtAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BoughtPlans", BoughtPlansSchema);
