"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const auth = require("./routes/auth");
const content = require("./routes/content");
const middlewares = require("./middlewares");

const api = express();

// Set server file size limits.
api.use(express.json({limit: '100mb'}));
api.use(express.urlencoded({limit: '100mb'}));

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// Basic route
api.get("/", (req, res) => {
  res.json({
    name: "FitHub Backend",
  });
});

// API routes from api.js.
api.use("/auth", auth);
api.use("/content", content);

module.exports = api;
