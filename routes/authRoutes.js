const express = require('express');
const { register, login, refreshToken } = require('../controllers/AuthController');
const { registerValidation, loginValidation, refreshValidation } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/refresh', refreshValidation, validateRequest, refreshToken);

module.exports = router;
