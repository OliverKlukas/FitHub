"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const auth = require("./routes/auth");
const content = require("./routes/content");
const boughtPlans = require("./routes/boughtPlans");
const middleware = require("./middleware");
const reviews = require("./routes/review");
const notifications = require("./routes/notifications");
const chat = require("./routes/chat")

const api = express();

// Set server file size limits.
api.use(express.json({limit: '100mb'}));
api.use(express.urlencoded({limit: '100mb'}));

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middleware.allowCrossDomain);

// Basic route
api.get("/", (req, res) => {
  res.json({
    name: "FitHub Backend",
  });
});

// API routes from api.js.
api.use("/auth", auth);
api.use("/content", content);
api.use("/boughtPlans", boughtPlans);
api.use("/review", reviews);
api.use("/notifications", notifications);
api.use("/chat", chat);

module.exports = api;
