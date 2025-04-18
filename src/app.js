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



// After all middlewares and routes, if there are no any route match, then this middleware will be executed
// Error handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling function
app.use((error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   return res.status(statusCode).json({
       status: 'errorrr',
       code: statusCode,
       message: error.message || 'Internal Server Error'
   });

});

module.exports = app;