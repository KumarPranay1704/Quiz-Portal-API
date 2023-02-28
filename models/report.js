const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({

    quizId: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    topicWiseMarks: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('report', reportSchema);