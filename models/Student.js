const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    joining: {
        type: String,
        required: true
    },
    marks: {
        type: [],
        required: false
    },
    firstSignIn: {
        type: Boolean,
        default: true,
        required: true
    },
    blockStatus: {
        type: Boolean,
        default: false,
        required: true
    }

})

module.exports = mongoose.model('student', studentSchema);