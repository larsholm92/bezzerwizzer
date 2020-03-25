var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router.route('/').post(userController.createUser);
router.route('/validate').post(userController.validateUser);

module.exports = router;
