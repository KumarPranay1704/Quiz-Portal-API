const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({

    quizId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('option', optionSchema);