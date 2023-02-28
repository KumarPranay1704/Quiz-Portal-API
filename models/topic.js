const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    totalCount: {
        type: Number,
        required: true
    },
    correctCount: {
        type: Number,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('topic', topicSchema);