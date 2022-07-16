"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const chatController = require("../controllers/chat");

// get chat between user who sends request and :id
router.get("/getChat/:id", middleware.checkAuthentication, chatController.getChat)

// updates a chat with a new Message
router.post("/updateChat/:id", middleware.checkAuthentication, chatController.updateChat)

// Get all chat partners of the requesting user.
router.get("/getChatPartner", middleware.checkAuthentication, chatController.getChatPartner)

module.exports = router;
