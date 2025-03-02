const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression')

// Middlewares
app.use(morgan('dev')); // HTTP request logger middleware
app.use(helmet()); // Secure Express apps by setting various HTTP headers
app.use(compression()); // Node.js compression middleware

// Database
require('./db/init.mongodb');
// const { countConnect } = require('./helpers/check.connect');
// countConnect();

app.get('/', (req, res) => {
    const strCompress='Hello World';
    return res.status(200).json({
        message: 'Hello World',
        metadata: strCompress.repeat(10000)
    });
}
);

module.exports = app;