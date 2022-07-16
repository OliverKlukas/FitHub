"use strict";

const express = require("express");
const router = express.Router();

const ContentController = require("../controllers/content");
const middleware = require("../middleware");

// List all content in database.
router.get("/", ContentController.list);

// Create new content.
router.post("/", middleware.checkAuthentication, ContentController.create);

// Get content item.
router.get("/:id", ContentController.get);

// Update content item.
router.put("/:id", middleware.checkAuthentication, ContentController.update);

// Delete content item.
router.delete("/:id", middleware.checkAuthentication, ContentController.remove);

// Get contentset of specific user
router.post(
  "/getMyContent",
  middleware.checkAuthentication,
  ContentController.getMyContent
);

module.exports = router;
