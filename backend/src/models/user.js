"use strict";

const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, /* TODO make into a pw hash instead of plaintext pw */
        required: true,
        unique: true
    },
    // role of the user, used for rights management
    role: {
        type: String,
        // role can only take the values "customer" and "contentCreator"
        enum: ["customer", "contentCreator"],
        // if not specified the role "customer" is chosen
        default: "customer"
    },
    description: {
        type: String,
        required: false
    }
});

UserSchema.set("versionKey", false);

// Export the User model
module.exports = mongoose.model("User", UserSchema);