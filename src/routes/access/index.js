const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();
const {asyncHandler} = require('../../utils/asyncHandler')


router.post('/shop/signup', asyncHandler(accessController.signUp));
router.post('/shop/signin', asyncHandler(accessController.signin));

module.exports = router;
