"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const auth = require('./routes/auth');
const contentrouter = require('./routes/content')

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'FitHub Backend'
    });
});

// TODO API Routes (import from src/routes)
api.use('/auth', auth);
api.use('/content', contentrouter)


module.exports = api;