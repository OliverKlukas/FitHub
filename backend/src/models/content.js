"use strict";
import { createModel } from 'mongoose-gridfs';

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    img: { 
        data: Buffer, 
        contentType: String 
     }
})

const Attachment = createModel();

const TagSchema = new mongoose.Schema({ tag: {type: String}})

const ContentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
    category: {
        type: String,
        // category can only take the values "training", "nutrition" or "coaching"
        enum: ["training", "nutrition","coaching"],
        // if not specified the category "training" is chosen
        default: "training"
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        get: getPrice, //workaround to include cents (shift of comma)
        set: setPrice,
        required: true
    },
    img: [ImageSchema]
    ,
    // amount of weeks the plan is designed for 
    duration: {
        type: Number,
        min: 1,
        required: true
    },
    // intensity of the plans and coachings is measured in "activities per week"
    intensity: {
        type: Number,
        min: 1,
        required: true
    },
    // the content creator can checkmark wheatear he offers fulltime support 
    fullSupport: {
        type: Boolean,
        default: false
    },
    tags: [TagSchema],
    //all pdfs -> sample plan and full plan
    plans: [Attachment]
    
})

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}


module.exports = mongoose.model("Content", ContentSchema);
