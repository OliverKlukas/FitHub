"use strict";

const express = require("express");
const router = express.Router();

const ContentController = require("../controllers/content");

// List all content in database.
router.get("/", ContentController.list);

// Create new content.
router.post("/", ContentController.create);

// TODO: update existing content.

// TODO: delete existing content.

module.exports = router;
