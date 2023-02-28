const mongoose = require('mongoose');

const allOptionSchema = mongoose.Schema({

    quizId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    options: {
        type: [],
        required: true,
    },
    correctOptions: {
        type: [],
        required: true,
    },
    isAttempted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('allOptions', allOptionSchema);