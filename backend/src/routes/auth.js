/* eslint-disable prettier/prettier */
"use strict";

const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

const middleware = require("../middleware");

const AuthController = require("../controllers/auth");

router.post("/register", AuthController.register); // register a new user
router.post("/login", AuthController.login); // login
router.post("/userdata", AuthController.userdata); // display publicly available user data, checks if its for the callers own profile
// router.get("/me", middleware.checkAuthentication, AuthController.me) // displays own user data, needs to be logged in
router.post("/logout", middleware.checkAuthentication, AuthController.logout); // logout
// router.post("/addreview", middleware.checkAuthentication, AuthController.addreview) //publishes a review
// router.put("/updatereview", middleware.checkAuthentication, AuthController.updatereview) //update a review
// router.delete("/deletereview", middleware.checkAuthentication, AuthController.deletereview) // delete a review

module.exports = router;
