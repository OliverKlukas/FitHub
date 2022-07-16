"use strict";

const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
);

const ChatSchema = new mongoose.Schema({
    partOne: {
        type: String,
        required: true,
    },
    partTwo: {
        type: String,
        required: true
    },
    messages: [Message],
},
);

module.exports = mongoose.model("chat", ChatSchema);