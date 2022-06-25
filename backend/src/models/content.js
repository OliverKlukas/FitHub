"use strict";

const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
})


module.exports = mongoose.model("Content", ContentSchema);
