const student = require('../models/Student');
const teacher = require('../models/Teacher');
const quiz = require('../models/quiz');
const question = require('../models/question');
const option = require('../models/option');
const attempted = require('../models/attempted');
const report = require('../models/report');
const allOptions = require('../models/allOptions');

const bcrypt = require('bcryptjs');

exports.passwordChange = async(req, res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    await student.updateOne({_id:req.user._id},{password:hashedPass,firstSignIn:false},(err,std)=>{
        if(err){
            res.json({
                msg:"Something went wrong"
            })
        }
        else{
            res.json({
                msg:std
            })
        }
    })
}

exports.getYourQuiz = async (req, res) => {
    await quiz.find({ branch: req.body.branch, uploadStatus: true }
        , (err, qz) => {
            if (err) {
                console.log(error);
                res.json({ msg: "some error!" });
            }
            else {
                res.json({ quiz: qz });
            }
        }
    ).clone()
}

exports.getAllQuestions = async (req, res) => {

    try {
        const ap = await allOptions.find({quizId:req.params.id, isAttempted:true})
        if(ap){
            return res.json({
                msg:"Quiz is Already Attempted."
            })
        }
        const qz = await question.find({ quizId: req.params.id })
        if (qz) {
            res.json({
                msg: qz
            });
        }
        else {
            res.status(400).json({
                message: `Something Went Wrong`
            })
        }
    } catch (err) {
        console.log(error);
        res.json({ errormsg: "some error!" });
    }
}

exports.attempted = async (req, res) => {

    const qid = req.body.qid;
    const sid = req.user._id;
    const quesid = req.body.quesid;
    const options = req.body.options;

    const atmp = new attempted({
        quizId: qid,
        studentId: sid,
        questionId: quesid,
        attemptedOptions: options
    })

    await atmp.save();

    student.updateOne({ _id: sid },
        {
            $push: {
                marks: { "quizId": qid, "marks": NaN }
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        }
    ).clone()
    quiz.updateOne({ _id: qid },
        {
            $push: {
                attemptedBy: sid
            }
        }, (err) => {
            if (err) {
                res.json({ msg: "Something went wrong!!" });
            }
        }
    ).clone()

    res.json({
        msg: "Attempted"
    });
}

exports.getAttempted = async (req, res) => {

    const sid = req.user._id;
    const stud = await student.findOne({ _id: sid });

    const qzIds = stud.marks;

    if (qzIds.length != 0) {
        res.json({
            msg: qzIds
        });
    }
    else if (qzIds.length == 0) {
        res.json({
            msg: NaN
        })
    }
    else {
        res.json({ msg: "Something went wrong!!" });
    }
}

exports.getunAttempted = async (req, res) => {

    const sid = req.user._id;
    const stud = await student.findOne({ _id: sid });
    const qz = await quiz.find();
    const arr = [];
    const reslt = [];
    qz.forEach(element => {
        arr.push((element._id).toString());
    })
    stud.marks.forEach(element => {
        if (!arr.includes(element.quizId))
            reslt.push(element.quizId)
    })

    res.json({
        msg: reslt
    });
}

exports.getReport = async (req, res) => {

    try {
        const rept = await report.find({ quizId: req.body.qid, studentId: req.body.sid });
        res.json({
            msg: rept
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong."
        })
    }


}