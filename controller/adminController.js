const admin = require('../models/admin');
const teacher = require('../models/Teacher');
const student = require('../models/Student');

exports.updateDetails = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: req.id }, {
            $set: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                firstSignIn: true,
                blockStatus: req.body.blockStatus
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "User deleted" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
                firstSignIn: true,
                blockStatus: req.body.blockStatus
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}

exports.updateName = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.UpdateOne({ _id: id }, {
            $set: {
                name: req.body.name,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
    else {
        student.UpdateOne({ _id: id }, {
            $set: {
                name: req.body.name,

            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}

exports.updateUsername = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.UpdateOne({ _id: id }, {
            $set: {
                username: req.body.username,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
    else {
        student.UpdateOne({ _id: id }, {
            $set: {
                username: req.body.username,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}

exports.updateEmail = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: id }, {
            $set: {
                email: req.body.email,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                email: req.body.email,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}

exports.updatePassword = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: id }, {
            $set: {
                password: req.body.password,
                firstSignIn: true,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                password: req.body.password,
                firstSignIn: true,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}

exports.updateUserType = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: id }, {
            $set: {
                userType: req.body.userType,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                userType: req.body.userType,
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Updated" })
    }
}


exports.blockId = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: id }, {
            $set: {
                blockStatus: true
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Blocked" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                blockStatus: true
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Blocked" })
    }
}

exports.unblockId = async (req, res) => {
    const id = req.params.id;
    if (req.body.userType === 'teacher') {
        teacher.updateOne({ _id: id }, {
            $set: {
                blockStatus: false
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Unblocked" })
    }
    else {
        student.updateOne({ _id: id }, {
            $set: {
                blockStatus: false
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        })
        res.json({ msg: "Unblocked" })
    }
}