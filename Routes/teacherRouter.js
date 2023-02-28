const express = require('express');
const Router = express.Router();

const teacherController = require('../controller/teacherController');
const verifyToken = require('../verifyToken');

Router.post('/passwordChange',verifyToken.auth,teacherController.passwordChange);
Router.post('/createQuiz', verifyToken.auth, teacherController.createQuiz);
Router.get('/getQuiz', verifyToken.auth, teacherController.getYourQuiz);
Router.post('/addQuestion', verifyToken.auth, teacherController.addQuestion);
Router.post('/createOption', verifyToken.auth, teacherController.createOption);
Router.delete('/deleteOption/:id', verifyToken.auth, teacherController.deleteOption);
Router.post('/correctOptions', verifyToken.auth, teacherController.addCorrectOption);
Router.delete('/deleteQuestion/:id', verifyToken.auth, teacherController.deleteQuestion);
Router.put('/uploadQuiz/:id', verifyToken.auth, teacherController.uploadQuiz);
Router.get('/getAllQuestions/:id', verifyToken.auth, teacherController.getAllQuestions);
Router.get('/getUploadedQuiz', verifyToken.auth, teacherController.getUploadquiz);
Router.delete('/deleteQuiz/:id', verifyToken.auth, teacherController.deleteQuiz);
Router.post('/evaluation', verifyToken.auth, teacherController.evaluation);
Router.post('/generateResult', verifyToken.auth, teacherController.generateResult);
Router.post('/generateReport', verifyToken.auth, teacherController.generateReport);
Router.post('/report', verifyToken.auth, teacherController.getReport);


module.exports = Router;