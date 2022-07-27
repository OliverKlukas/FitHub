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

// get distribution of sales by offered content
router.post(
  "/getSalesDistribution",
  middleware.checkAuthentication,
  boughtPlansController.getSalesDistribution
);

// get finacial data like payout, growth
router.post(
  "/getFinancials",
  middleware.checkAuthentication,
  boughtPlansController.getFinancials
);

// get sales of last 8 weeks
router.post(
  "/getTimeline",
  middleware.checkAuthentication,
  boughtPlansController.getTimeline
);

module.exports = router;
