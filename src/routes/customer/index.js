const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/asyncHandler');
const CustomerController = require('../../controllers/customer.controller')

router.post('', asyncHandler(CustomerController.addCustomer))
module.exports = router