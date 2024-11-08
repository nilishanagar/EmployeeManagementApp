const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const routes= require('express').Router();

routes.post('/login', loginValidation, login);
routes.post('/signup', signupValidation, signup);



module.exports = routes;