const express = require('express');
const Router = express.Router();

const loginController = require('../controller/loginController');
const registerController = require('../controller/registerController');


Router.post('/adminRegister', registerController.adminRegister);

Router.post('/adminLogin', loginController.adminLogin);

Router.post('/login', loginController.login);
Router.post('/studentLogin', loginController.studentLogin);
Router.post('/teacherLogin', loginController.teacherLogin);

module.exports = Router;