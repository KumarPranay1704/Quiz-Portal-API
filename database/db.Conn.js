const mongoose = require('mongoose');
const dbConfig = require('./db.Config');

const dbConn = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(dbConfig.uri)
        console.log('Connected to the DATABASE.')
    } catch (err) {
        console.log(err);
    }
}
module.exports = dbConn;