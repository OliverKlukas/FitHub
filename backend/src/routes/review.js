"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const ReviewController = require("../controllers/review");

// adds a review to a user, if the user was already reviewed by the same reviewer, the review gets updated instead
router.put(
  "/addreview/:id",
  middleware.checkAuthentication,
  ReviewController.addreview
);
// delete a review
router.delete(
  "/deletereview",
  middleware.checkAuthentication,
  ReviewController.deletereview
);

module.exports = router;