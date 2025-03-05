const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression')

// Middlewares
app.use(morgan('dev')); // HTTP request logger middleware
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(compression()); // Node.js compression middleware
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)

// Database
require('./db/init.mongodb');
// const { countConnect } = require('./helpers/check.connect');
// countConnect();

// Routes
app.use('', require('./routes'));

module.exports = app;