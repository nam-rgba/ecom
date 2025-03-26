const express = require('express');
const router = express.Router();
const { apiKey, checkPermission } = require('../auth/checkAPIkey');

// middleware to check the API key
router.use(apiKey);
//midelware to check the permission
router.use(checkPermission('0000'));


// routes for the access controller
router.use('/v1/api', require('./access'));
router.use('/v1/api/product', require('./product'));


module.exports = router;