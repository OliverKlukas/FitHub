"use strict";

const express = require("express");
const router = express.Router();

const ContentController = require("../controllers/content");

// List all content in database.
router.get("/", ContentController.list);

// Create new content.
router.post("/", ContentController.create);

module.exports = router;
