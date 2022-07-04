"use strict";

const express = require("express");
const router = express.Router();

const ContentController = require("../controllers/content");

// List all content in database.
router.get("/", ContentController.list);

// Create new content.
router.post("/", ContentController.create);

// Get content item.
router.get("/:id", ContentController.get);

// Update content item.
router.put("/:id", ContentController.update);

// Delete content item.
router.delete("/:id", ContentController.remove);

module.exports = router;
