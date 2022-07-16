"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware");

const AuthController = require("../controllers/auth");

router.get("/getCreators", AuthController.getContentCreatorNames);
router.get("/getUsername/:ownerId", AuthController.getUsername);
// register a new user
router.post("/register", AuthController.register);
// signin
router.post("/signin", AuthController.signin);
// display publicly available user data, checks if its for the callers own profile
router.post("/userdata", AuthController.userdata);
// logout
router.post("/logout", middleware.checkAuthentication, AuthController.logout);
// checks user, then deletes user
router.delete(
  "/delete",
  middleware.checkAuthentication,
  AuthController.deleteuser
);
// checks user, then updates user
router.put(
  "/update",
  middleware.checkAuthentication,
  AuthController.updateuser
);
// gets first and last name of a user through their email
router.get("/:email", AuthController.checkEmail);
// gets Information needed for the Dashboard
router.get("/getReviewAnalytics", middleware.checkAuthentication, AuthController.getReviewAnalytics);

module.exports = router;