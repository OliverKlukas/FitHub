"use strict";

const mongoose = require("mongoose");

/**
 * Defines schema for fitness, nutrition and coaching content.
 *
 * Expected to be a JSON of: {
 *     _id: unique identifier of content,
 *     ownerId: owner of the content item,
 *     title: title of content,
 *     description: text outlining content,
 *     price: string as cents workaround,
 *     duration: amount of weeks,
 *     intensity: activities per week,
 *     support: content and buyer are supported by creator,
 *     tags: list of string tags the content corresponds to,
 *     featured: content is prominently featured on discovery,
 *     media: list of images,
 *     plan: pdf of plan,
 *     sample: pdf of plan sample,
 * }
 *
 */
const ContentSchema = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    category: {
        type: String, enum: ["training", "nutrition", "coaching"], required: true
    }, title: {
        type: String, required: true
    }, description: {
        type: String, required: true
    }, price: {
        type: String, required: true
    }, duration: {
        type: Number, min: 1, required: true
    }, intensity: {
        type: Number, min: 1, required: true
    }, support: {
        type: Boolean, required: true
    }, tags: [{
        type: String, required: true
    }], featured: {
        type: Boolean, required: true
    }, media: {
        type: [{
            type: String
        }], required: true
    }, plan: {
        type: String, required: true
    }, sample: {
        type: String, required: true
    },
})

module.exports = mongoose.model("Content", ContentSchema);
