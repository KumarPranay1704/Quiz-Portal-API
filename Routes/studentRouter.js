const express = require('express');
const Router = express.Router();

const studentController = require('../controller/studentController');
const verifyToken = require('../verifyToken');


Router.post('/passwordChange',verifyToken.auth,studentController.passwordChange);
Router.post('/getQuiz', verifyToken.auth, studentController.getYourQuiz);
Router.get('/getQuestions/:id', verifyToken.auth, studentController.getAllQuestions);
Router.post('/attempted', verifyToken.auth, studentController.attempted);
Router.get('/getAttempted', verifyToken.auth, studentController.getAttempted);
Router.get('/getUnattempted', verifyToken.auth, studentController.getunAttempted);
Router.post('/report', verifyToken.auth, studentController.getReport);

module.exports = Router;