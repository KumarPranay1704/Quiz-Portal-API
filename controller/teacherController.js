const student = require('../models/Student');
const teacher = require('../models/Teacher');
const quiz = require('../models/quiz');
const question = require('../models/question');
const option = require('../models/option');
const attempted = require('../models/attempted');
const topic = require('../models/topic');
const allOptions = require('../models/allOptions');
const report = require('../models/report');



exports.passwordChange = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    await student.updateOne({ _id: req.user._id }, { password: hashedPass, firstSignIn: false }, (err, tchr) => {
        if (err) {
            res.json({
                msg: "Something went wrong"
            })
        }
        else {
            res.json({
                msg: tchr
            })
        }
    })
}

exports.createQuiz = async (req, res) => {
    const qname = req.body.name;
    const tid = req.user._id;
    const time = req.body.quizTime;
    const number = req.body.noOfQuestions;
    const schedule = req.body.quizSchedule;
    const brnch = req.body.branch;

    const qz = new quiz({
        name: qname,
        teacherId: tid,
        quizTime: time,
        noOfQuestions: number,
        branch: brnch,
        quizSchedule: schedule
    })

    await qz.save((error, qz) => {
        if (error) {
            console.log(error);
            res.json({ message: "some error!" });
        }
        else {
            res.status(200).json({
                message: "Quiz added!!",
                quizData: qz
            })
        }
    })

}

exports.getYourQuiz = async (req, res) => {
    quiz.find({ teacherId: req.user._id }
        , (err, qz) => {
            if (err) {
                console.log(error);
                res.json({ msg: "some error!" });
            }
            else {
                res.json({ quiz: qz });
            }
        }
    )
}

exports.addQuestion = async (req, res) => {

    var que = new question({
        quizId: req.body.quizId,
        question: req.body.question,
        qtype: req.body.qtype,
        topic: req.body.topic,
        marks: req.body.marks,
        negativeMarks: req.body.negativeMarks
    });

    await que.save((error, qsn) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json({ message: "Question added!!" })
        }
    })

}

exports.createOption = async (req, res) => {
    var opt = new option({

        value: req.body.value,
        quizId: req.body.quizId,
        questionId: req.body.questionId
    })
    await opt.save((error, opt) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json(
                {
                    message: "Option added!!",
                    option: opt
                }
            )
        }
    })
}

exports.deleteOption = async (req, res) => {
    await option.deleteOne({ _id: req.params.id }, (error, opt) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json({ message: "Option deleted!!" })
        }
    }).clone();
}

exports.addCorrectOption = async (req, res) => {

    const optionsDetails = await option.find({ quizId: req.body.qid, questionId: req.body.quesid });
    var options = [];
    optionsDetails.forEach(element => {
        options.push(element._id);
    })
    const correct = req.body.correctOptions;
    const allOpt = new allOptions({
        quizId: req.body.qid,
        questionId: req.body.quesid,
        options: options,
        correctOptions: correct
    })
    await allOpt.save((err, allOptions) => {
        if (err) {
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json(
                {
                    message: "all options added!!",
                    options: allOptions
                }
            )
        }
    })
}
exports.deleteQuestion = async (req, res) => {
    const id = req.params.id;
    await allOptions.deleteOne({ questionId: id }).clone()
    await option.deleteMany({ questionId: id }).clone()

    await question.deleteOne({ _id: id }, (error, qsn) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json({ message: "Question deleted!!" })
        }
    }).clone()


}

exports.uploadQuiz = async (req, res) => {
    const qz = await quiz.findOne({ _id: req.params.id })
    if (qz.noOfQuestions < 1) {
        res.json({ msg: "You must have at least 1 question in quiz for uploading !!" });
    }
    else {
        await quiz.updateOne({ _id: req.params.id }, { uploadStatus: true }, function (err, user) {
            if (err) {
                console.log(err)
                res.json({ msg: "something went wrong!!" })
            }
            else {
                res.json({ msg: "Quiz uploaded!" });
            }
        }).clone()
    }
}
exports.getAllQuestions = async (req, res) => {
    try {
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

exports.getUploadquiz = async (req, res) => {
    await quiz.find({ teacherId: req.user._id, uploadStatus: true }, (err, qz) => {
        if (err) {
            console.log(err);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    }).clone()
}



exports.deleteQuiz = async (req, res) => {
    var id = req.params.id
    await quiz.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Something went wrong!!" });
            console.log("Error in deletion");
        }
    }).clone()
    await question.deleteMany({ quizid: id }, (err) => {
        if (err) {
            res.json({ msg: "Something went wrong!!" });
        }
    }).clone()
    res.status(200).json({ msg: "Quiz Deleted Successfully" })
}


exports.evaluation = async (req, res) => {

    try {
        const attm = await attempted.findOne({ quizId: req.body.quizId, studentId: req.body.studentId, questionId: req.body.questionId });
        const options = await allOptions.findOne({ questionId: req.body.questionId, quizId: req.body.quizId });
        const que = await question.findOne({ questionId: req.body.questionId });
        const tpc = await topic.find({ quizId: req.body.quizId, studentId: req.body.studentId, title: que.topic })
        var marks = 0;

        attm.attemptedOptions.forEach(async element => {
            if (options.correctOptions.includes(element)) {
                marks += que.marks;
                if (tpc.length == 0) {
                    await topic.create(
                        {
                            title: que.topic,
                            totalCount: 1,
                            correctCount: 1,
                            quizId: req.body.quizId,
                            studentId: req.body.studentId
                        }
                    )
                }
                else {
                    await topic.updateOne({ quizId: req.body.quizId }, {
                        $inc: {
                            correctCount: 1,
                            totalCount: 1
                        }
                    })
                }
            }
            else {
                marks -= que.negativeMarks;
                if (tpc.length == 0) {
                    await topic.create(
                        {
                            title: que.topic,
                            totalCount: 1,
                            correctCount: 0,
                            quizId: req.body.quizId,
                            studentId: req.body.studentId
                        }
                    )
                }
                else {
                    await topic.updateOne({ quizId: req.body.quizId }, {
                        $inc: {

                            totalCount: 1
                        }
                    })
                }
            }
        })

        res.json({
            msg: marks
        });

    } catch (err) {
        res.json({ msg: "some error!" });
    }

}


exports.evaluationAll = async (req, res) => {

    var arr = [];
    var rst = [];

    var details = {
        studId,
        qId
    }

    try {

        const qz = await quiz.find({ isEvaluated: false });
        qz.forEach(element => {
            if (element.attemptedBy.count() != 0) {
                element.attemptedBy.forEach(ele => {
                    details.qId = element._id;
                    details.studId = ele
                    arr.push(details);
                })
            }
        })

        arr.forEach(async element => {
            const allQue = await question.find({ quizId: element.qId });
            allQue.forEach(async ele => {
                const attm = await attempted.findOne({ quizId: element.qId, studentId: element.studId, questionId: ele._id });
                const options = await allOptions.findOne({ questionId: ele._id, quizId: element.qId });
                const que = await question.findOne({ questionId: ele._id });
                const tpc = await topic.find({ quizId: element.qId, studentId: element.studId, title: que.topic })
                var marks = 0;

                attm.attemptedOptions.forEach(async element => {
                    if (options.correctOptions.includes(element)) {
                        marks += que.marks;
                        if (tpc.length == 0) {
                            await topic.create(
                                {
                                    title: que.topic,
                                    totalCount: 1,
                                    correctCount: 1,
                                    quizId: element.qId,
                                    studentId: element.studId
                                }
                            )
                        }
                        else {
                            await topic.updateOne({ quizId: element.qId }, {
                                $inc: {
                                    correctCount: 1,
                                    totalCount: 1
                                }
                            })
                        }
                    }
                    else {
                        marks -= que.negativeMarks;
                        if (tpc.length == 0) {
                            await topic.create(
                                {
                                    title: que.topic,
                                    totalCount: 1,
                                    correctCount: 0,
                                    quizId: element.qId,
                                    studentId: element.studId,
                                }
                            )
                        }
                        else {
                            await topic.updateOne({ quizId: element.qId }, {
                                $inc: {

                                    totalCount: 1
                                }
                            })
                        }
                    }
                })
                await student.updateOne({ _id: element.studId },
                    {
                        $set: {
                            marks: { "quizId": element.qId, "marks": marks }
                        }
                    })
                res.json({
                    msg: "Evaluation Successfull"
                })
            })
        })

    } catch (err) {
        res.json({ msg: "some error!" });
    }

}


exports.generateResult = async (req, res) => {
    const sid = req.body.sid;
    const marks = req.body.marks;
    const qid = req.body.qid;

    try {
        await student.updateOne({ _id: sid },
            {
                $set: {
                    marks: { "quizId": qid, "marks": marks }
                }
            })
        res.json({
            msg: "Updation Successfull"
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong."
        })
    }
}

exports.generateReport = async (req, res) => {
    try {
        const sid = req.body.sid;
        const qid = req.body.qid;
        var rt;
        var re = await topic.find({ quizId: qid, studentId: sid });
        const stud = await student.findOne({ studentId: sid })
        stud.marks.forEach(element => {
            if (element.quizId == qid) {
                rt = element.marks;
            }
        })
        const rpot = [];
        var titl;
        var prct;
        re.forEach(element => {
            titl = element.title;
            prct = (element.correctCount / element.totalCount) * 100;
            rpot.push({ title: titl, percentage: prct });
        })

        const result = new report({
            studentId: sid,
            quizId: qid,
            totalMarks: rt,
            topicWiseMarks: rpot
        })
        await result.save();
        res.json({
            msg: "Report Generated!!"
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong!!"
        })
    }

}
exports.getReport = async (req, res) => {

    try {
        const rept = await report.find({ quizId: req.body.qid });
        res.json({
            msg: rept
        })
    } catch (err) {
        res.json({
            msg: "Something went wrong."
        })
    }


}