"use strict";

const mongoose = require("mongoose");

/**
 * Defines schema for tags that are used to filter for content in frontend.
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any, {}, DefaultTypeKey, {tag: {type: StringConstructor}}>}
 */
const TagSchema = new mongoose.Schema({tag: {type: String}})

/**
 * Defines that images are strings in our db.
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any, {}, DefaultTypeKey, {img: {type: StringConstructor}}>}
 */
const ImageSchema = new mongoose.Schema({
    img: {
        type: String
    }
})

/**
 * Defines schema for fitness, nutrition and coaching content.
 *
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any, {}, DefaultTypeKey, {duration: {min: number, type: NumberConstructor, required: boolean}, intensity: {min: number, type: NumberConstructor, required: boolean}, img: {default: string, type: StringConstructor}, price: {min: number, set: (function(*)), get: (function(*): string), type: NumberConstructor, required: boolean}, contentId: {ref: string, type: ObjectId}, fullSupport: {default: boolean, type: BooleanConstructor}, category: {default: string, type: StringConstructor, enum: string[]}, title: {type: StringConstructor, required: boolean}, userId: {ref: string, type: ObjectId}, tags: module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, any, {}, DefaultTypeKey, {tag: {type: StringConstructor}}>[]}>}
 */
const ContentSchema = new mongoose.Schema({
    //TODO: ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    //TODO: id: {type: mongoose.Schema.Types.ObjectId, ref: "Content"},
    category: {
        type: String, // category can only take the values "training", "nutrition" or "coaching"
        enum: ["training", "nutrition", "coaching"], // if not specified the category "training" is chosen
        required: true
    },
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    price: {
        type: Number, min: 1, get: getPrice, //workaround to include cents (shift of comma)
        set: setPrice, required: true
    },
    /* TODO: media: {
        type: [ImageSchema],
        required: true
    },*/
    // Amount of weeks the plan is designed for.
    duration: {
        type: Number, min: 1, required: true
    }, // Intensity of the plans and coachings is measured in "activities per week".
    intensity: {
        type: Number, min: 1, required: true
    }, // Content creator can checkmark whether they offer full-time support.
    support: {
        type: Boolean, required: true
    },
    tags: [TagSchema],
    // Denotes whether owner bought premium placement for this content.
    featured: {
        type: Boolean, required: true
    }
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
