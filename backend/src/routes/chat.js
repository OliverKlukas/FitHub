"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const chatController = require("../controllers/chat");

// get Messages of a User
router.get("/getChat/:id", middleware.checkAuthentication,chatController.getChat)
// updates a chat with a new Message
router.post("/updateChat/:id", middleware.checkAuthentication, chatController.updateChat)
