const express = require('express');
const Router = express.Router();

const registerController = require('../controller/registerController');
const adminController = require('../controller/adminController');
const verifyToken = require('../verifyToken');

Router.post('/studentRegister', verifyToken.auth, registerController.studentRegister);
Router.post('/teacherRegister', verifyToken.auth, registerController.teacherRegister);
Router.put('/updateDetails/:id', verifyToken.auth, adminController.updateDetails);
Router.put('/updateUsername/:id', verifyToken.auth, adminController.updateUsername);
Router.put('/updateName/:id', verifyToken.auth, adminController.updateName);
Router.put('/updateEmail/:id', verifyToken.auth, adminController.updateEmail);
Router.put('/updatePassword/:id', verifyToken.auth, adminController.updatePassword);
Router.put('/updateUserType/:id', verifyToken.auth, adminController.updateUserType);
Router.put('/block/:id', verifyToken.auth, adminController.blockId);
Router.put('/unblock/:id', verifyToken.auth, adminController.unblockId);

module.exports = Router;