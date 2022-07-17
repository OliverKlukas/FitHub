"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const chatController = require("../controllers/chat");

// Posts a new message in a chat.
router.post("/updateChat/:id", middleware.checkAuthentication, chatController.updateChat)

// Get all chat partners of the requesting user.
router.get("/", middleware.checkAuthentication, chatController.getChats)

module.exports = router;
