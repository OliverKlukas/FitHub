"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const auth = require("./routes/auth");
const content = require("./routes/content");
const boughtPlans = require("./routes/boughtPlans");
const middleware = require("./middleware");
const chat = require("./routes/chat");

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
api.use("/chat", chat);
api.use("/boughtPlans", boughtPlans);

module.exports = api;
