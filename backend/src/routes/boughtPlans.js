"use strict";

const express = require("express");
const router = express.Router();

const boughtPlansController = require("../controllers/boughtPlans");
const middleware = require("../middleware");

// List all boughtPlans in database.
router.get("/", middleware.checkAuthentication, boughtPlansController.list);

// Create new boughtPlans.
router.post("/", middleware.checkAuthentication, boughtPlansController.create);

// Get boughtPlans item.
router.get("/:id", middleware.checkAuthentication, boughtPlansController.get);


module.exports = router;
