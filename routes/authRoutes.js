const express = require('express');
const { signup, login } = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = express.Router();

authRouter.post('/signup', validateUser, signup);
authRouter.post('/login', login);

module.exports = { authRouter };