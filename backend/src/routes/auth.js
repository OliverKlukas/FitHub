"use strict";

const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth")

router.post("/register",AuthController.register)
router.get("/login",AuthController.login)
router.get("/userdata",AuthController.userdata)  //TODO check middle
router.post("/logout", AuthController.logout)    //TODO check middleware

module.exports = router;