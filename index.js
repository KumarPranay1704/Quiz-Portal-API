const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: "*"
}
require('dotenv').config();

const dbConn = require('./database/db.Conn');

const logRouter = require('./Routes/logRouter');
const adminRouter = require('./Routes/adminRouter');
const teacherRouter = require('./Routes/teacherRouter');
const studentRouter = require('./Routes/studentRouter');

const Port = process.env.PORT || 3000;
dbConn();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', logRouter);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);


app.listen(Port, () => {
    console.log(`\nServer is RUNNING at PORT Number: ${Port}`);
})