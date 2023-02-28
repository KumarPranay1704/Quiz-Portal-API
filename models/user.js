const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema);