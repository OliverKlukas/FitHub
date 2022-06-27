"use strict";

const express = require("express");
const router = express.Router();

const ContentController = require("../controllers/content")

router.post("/upload",ContentController.uploadContent)
router.delete("/delete",ContentController.deleteContent)
router.get("/contentdetails",ContentController.accessContentDetails)
router.get("/boughtcontent", ContentController.accessBoughtContent)
router.put("/update",ContentController.updateContent)