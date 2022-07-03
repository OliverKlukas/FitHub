"use strict";

const mongoose = require("mongoose");

/**
 * Defines schema for fitness, nutrition and coaching content.
 *
 * Expected to be a JSON of: {
 *     _id: unique identifier of content,
 *     title: title of content,
 *     description: text outlining content,
 *     price: number including cents workaround,
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
    //TODO add when connecting user backend: ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    id: {type: String, required: true}, category: {
        type: String, enum: ["training", "nutrition", "coaching"], required: true
    }, title: {
        type: String, required: true
    }, description: {
        type: String, required: true
    }, price: {
        type: Number, min: 1, get: getPrice, set: setPrice, required: true
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

/**
 * TODO:
 *
 * @param num
 * @returns {string}
 */
function getPrice(num) {
    return (num / 100).toFixed(2);
}

/**
 * TODO:
 *
 * @param num
 * @returns {number}
 */
function setPrice(num) {
    return num * 100;
}

module.exports = mongoose.model("Content", ContentSchema);
