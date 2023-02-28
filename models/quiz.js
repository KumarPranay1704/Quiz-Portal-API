const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    teacherId: {
        type: String,
        required: true
    },
    quizTime: {
        type: Number,
        required: true
    },
    noOfQuestions: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    uploadStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    quizSchedule: {
        type: String,
        required: true
    },
    attemptedBy: {
        type: [],
        required: false
    },
    isEvaluated: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('quiz', quizSchema);