const mongoose = require('mongoose');

const attemptedSchema = mongoose.Schema({

    quizId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    attemptedOptions: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('attempted', attemptedSchema);