const express = require('express');
const registerController = require('../controllers/register.controller');
const validateAdmin = require('../middleware/validateAdmin');

const router = express.Router();

router.post('/', registerController.registerUser);
router.post('/adm', validateAdmin, registerController.registerUser);

module.exports = router;