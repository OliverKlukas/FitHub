"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const chatController = require("../controllers/chat");

// updates a chat with a new Message
router.post("/updateChat/:id", middleware.checkAuthentication, chatController.updateChat)

// Get all chat partners of the requesting user.
router.get("/", middleware.checkAuthentication, chatController.getChats)

module.exports = router;
