const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const admin = require('../models/admin');
const teacher = require('../models/Teacher');
const student = require('../models/Student');
const Mail = require('../sendEmail');
const users = require('../models/user');


require('dotenv').config();


const nameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?_ ])\S*$/;


exports.adminRegister = async (req, res) => {

    if (!nameRegex.test(req.body.name)) {
        return res.status(400).send(`In "Name" : Please Enter Letters Only`);
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).send(`In "Email" : Please Entert Correct Format`);
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).send(`In "Password" : Minimum 6 Characters,At least 1 UpperCase Letter,At least 1 lower case English letter,At least 1 letter,At least 1 special character`);
    }

    try {

        const user = await admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send(`Email Already Exists`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new admin({
            email: req.body.email,
            username: "admin",
            password: hashedPass,
            userType: "admin"
        })
        const savedAdmin = await newAdmin.save();
        res.status(200).json({
            message: `Registered Successfully`
        })

    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}



exports.studentRegister = async (req, res) => {

    if (!nameRegex.test(req.body.name)) {
        return res.status(400).send(`In "Name" : Please Enter Letters Only`);
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).send(`In "Email" : Please Entert Correct Format`);
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).send(`In "Password" : Minimum 6 Characters,At least 1 UpperCase Letter,At least 1 lower case English letter,At least 1 letter,At least 1 special character`);
    }

    try {
        const emailExists = await student.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send(`Email Already Exists`);

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        console.log('hello')
        const yearOfJoining = (req.body.joining).substring(2,4);
        var branchCode = "310";
        if (req.body.branch === "ece"){
            branchCode = "410";
        }
        else if (req.body.branch === "eee")
            branchCode = "510";
        else if (req.body.branch === "eie")
            branchCode = "610";
        var county = await student.count();
        county = county + 1;
        const formattedNumber = county.toLocaleString('en-US', {
            minimumIntegerDigits: 3,
            useGrouping: false
        })
        const uname = yearOfJoining + '0' + branchCode + formattedNumber;
        const user = new student({
            name: req.body.name,
            email: req.body.email,
            username: uname,
            password: hashedPass,
            userType: "student",
            joining:req.body.joining,
            branch:req.body.branch
        })
        const u = new users({
            username:uname,
            userType:"student"
        })
        const savedUser = await user.save();
        await u.save();
        if(savedUser){
            await Mail.sendMail(savedUser.email,savedUser.name,savedUser.username,req.body.password);

        }
        res.status(200).json({
            message: 'Registered Successfully',
            userData: savedUser
        })
    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong',
            error:err.message
        })
    }
}

exports.teacherRegister = async (req, res) => {

    if (!nameRegex.test(req.body.name)) {
        return res.status(400).send(`In "Name" : Please Enter Letters Only`);
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).send(`In "Email" : Please Entert Correct Format`);
    }
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).send(`In "Password" : Minimum 6 Characters,At least 1 UpperCase Letter,At least 1 lower case English letter,At least 1 letter,At least 1 special character`);
    }

    try {
        const emailExists = await teacher.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send(`Email Already Exists`);

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const formattedName = (req.body.name).substring(0, 5);
        var county = await teacher.count();
        county = county + 1;
        const formattedNumber = county.toLocaleString('en-US', {
            minimumIntegerDigits: 4,
            useGrouping: false
        })
        const uname = formattedName + formattedNumber;

        const user = new teacher({
            name: req.body.name,
            email: req.body.email,
            username: uname,
            password: hashedPass,
            userType: "teacher"
        })
        const u = new users({
            username:uname,
            userType:"teacher"
        })
        const savedUser = await user.save();
        await u.save();
        if(savedUser){
            Mail.sendMail(savedUser.email,savedUser.name,savedUser.username,req.body.password);
        }
        res.status(200).json({
            message: 'Registered Successfully',
            userData: savedUser
        })
    } catch (err) {
        res.status(400).json({
            message: 'Something went wrong',
            error: err.message
        })
    }
}