const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const admin = require('../models/admin');
const teacher = require('../models/Teacher');
const student = require('../models/Student');
const users = require('../models/user');

require('dotenv').config();

exports.adminLogin = async (req, res) => {
    try {
        const user = await admin.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.SECRET_KEY);
        res.header('auth-token', token);
        res.status(200).json({
            message: 'Logged In Successfully',
            userData: user,
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

exports.teacherLogin = async (req, res) => {
    try {
        const user = await teacher.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        if (user.blockStatus === true) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.SECRET_KEY);

        res.header('auth-token', token);
        res.status(200).json({
            message: 'Logged In Successfully',
            userData: user,
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

exports.studentLogin = async (req, res) => {
    try {
        const user = await student.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        if (user.blockStatus === true) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.SECRET_KEY);

        res.header('auth-token', token);
        res.status(200).json({
            message: 'Logged In Successfully',
            userData: user,
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const u = await users.findOne({username:req.body.username});
        if (!u) {
            return res.status(400).send(`Username or Password doesn't exist`);
        }
        var user;
        if(u.userType === 'student'){
            user = await student.findOne({ username: req.body.username });
        }
        else{
            user = await teacher.findOne({ username: req.body.username });
        }
        if (!user) {
            return res.status(400).send(`Username or Password doesn't exist`);
        }
        if (user.blockStatus === true) {
            return res.status(400).send(`Username or Password doesn't exist`);
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send(`Email or Password doesn't exist`);
        }
        const token = jwt.sign({ _id: user._id, userType: user.userType }, process.env.SECRET_KEY);

        res.header('auth-token', token);
        res.status(200).json({
            message: 'Logged In Successfully',
            userData: user,
            token: token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}