const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({

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

module.exports = mongoose.model('teacher', teacherSchema);