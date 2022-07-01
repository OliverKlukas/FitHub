"use strict";

const express = require("express");
const router = express.Router();

const middleware = require("../middleware")

const AuthController = require("../controllers/auth")

router.post("/register",AuthController.register) //register a new user 
router.get("/login",AuthController.login)   //login
router.get("/userdata", AuthController.userdata) // display publicly available user data, only works for Content Creators
router.get("/me", middleware.checkAuthentication, AuthController.me) // displays own user data, needs to be logged in
router.post("/logout", middleware.checkAuthentication, AuthController.logout)  //logout
router.post("/addreview", middleware.checkAuthentication, AuthController.addreview) //publishes a review
router.put("/updatereview", middleware.checkAuthentication, AuthController.updatereview) //update a review
router.delete("/deletereview", middleware.checkAuthentication, AuthController.deletereview) // delete a review

module.exports = router;
