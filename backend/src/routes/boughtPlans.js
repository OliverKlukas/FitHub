"use strict";

const express = require("express");
const router = express.Router();

const boughtPlansController = require("../controllers/boughtPlans");

// List all boughtPlans in database.
router.get("/", boughtPlansController.list);

// Create new boughtPlans.
router.post("/", boughtPlansController.create);

// Get boughtPlans item.
router.get("/:id", boughtPlansController.get);


module.exports = router;
