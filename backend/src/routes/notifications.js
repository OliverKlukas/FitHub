"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const NotificationsController = require("../controllers/notifications");

// get Notifications Number
router.get(
  "/notificationsnumber",
  middleware.checkAuthentication,
  NotificationsController.getNewNotifications
);
// resets Review Counter
router.post("/cleanReviewCounter", middleware.checkAuthentication, NotificationsController.cleanReviewCounter);
// resets Message Counter
router.post("/cleanMessageCounter", middleware.checkAuthentication, NotificationsController.cleanMessageCounter);
// increase Message Counter
router.post("/increaseMessageCounter/:id", middleware.checkAuthentication, NotificationsController.increaseMessageCounter);

module.exports = router;