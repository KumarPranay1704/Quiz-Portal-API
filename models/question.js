const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    quizId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    qtype: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    negativeMarks: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('question', questionSchema);