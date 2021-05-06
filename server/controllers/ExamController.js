'use strict'

const { Exam } = require('../schema/exam');
const { Question } = require('../schema/question');
const { Answer } = require('../schema/answer');

const mongoose = require('mongoose');

class ExamController {


    //Instructor Create Exam
    //startTime Fromat "2021-04-01T05:30:00Z"
    static async addExam(req, res) {
        try {
            let name = req.body.name;
            let courseId = req.body.courseId;
            let duration = req.body.duration;
            let startTime = new Date(req.body.startTime);
            let totalMarks = req.body.totalMarks;

            let exam = new Exam({
                name: name,
                courseId: mongoose.Types.ObjectId(courseId),
                duration: duration,
                startTime: startTime,
                totalMarks: totalMarks
            });

            let examStored = await exam.save();

            var questions = [];
            req.body.questions.forEach((question) => {
                questions.push({
                    statement: question.statement,
                    options: question.options,
                    correctOption: question.correctOption,
                    marks: question.marks,
                    examId: mongoose.Types.ObjectId(examStored._id)
                })
            })
            await Question.insertMany(questions);
            return res.status(200).send({ success: true, msg: 'Exam Added Successfuly', exam: await Exam.findById({ _id: examStored._id }) });


        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Get all exams of a course by courseId
    static async getExams(req, res) {
        try {
            let exams = await Exam.aggregate([
                {
                    $match: {
                        courseId: mongoose.Types.ObjectId(req.query.courseId)
                    }
                }
            ]);
            if (exams[0]) {
                return res.status(200).send({ success: true, msg: 'Exams Fetched Successfuly', exams: exams });
            } else {
                return res.status(401).send({ success: false, msg: 'Exam does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor Get specific Exam by its name
    //Throw Random questions from pool
    static async getExam(req, res) {
        try {
            let exam = await Exam.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.query.examId)
                    }
                },
                {
                    $lookup: {
                        from: "questions",
                        localField: "_id",
                        foreignField: "examId",
                        as: "question"
                    }
                },
                {
                    $unwind: {
                        path: "$question",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        courseId: { $first: "$courseId" },
                        duration: { $first: "$duration" },
                        startTime: { $first: "$startTime" },
                        totalMarks: { $first: "$totalMarks" },
                        question: { $push: "$question" },
                    }
                }
            ]);
            if (exam[0]) {
                return res.status(200).send({ success: true, msg: 'Exam Fetched Successfuly', exam: exam });
            } else {
                return res.status(401).send({ success: false, msg: 'Exam does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor update exam and questions
    static async updateExam(req, res) {
        try {
            let checkExam = await Exam.findById({ _id: req.query.examId });
            if (!checkExam) {
                return res.status(401).send({ success: false, msg: 'Exam does not exist!' });
            } else {
                let name = req.body.name;
                let duration = req.body.duration;
                let startTime = new Date(req.body.startTime);
                let totalMarks = req.body.totalMarks;

                await Exam.findOneAndUpdate({ _id: req.query.examId }, {
                    $set: {
                        name: name,
                        duration: duration,
                        startTime: startTime,
                        totalMarks: totalMarks
                    }
                });
                await Question.deleteMany({ examId: checkExam._id })
                var questions = [];
                req.body.questions.forEach((question) => {
                    questions.push({
                        statement: question.statement,
                        options: question.options,
                        correctOption: question.correctOption,
                        marks: question.marks,
                        examId: mongoose.Types.ObjectId(checkExam._id)
                    })
                })
                await Question.insertMany(questions);
                return res.status(200).send({ success: true, msg: 'Exam Updated Successfuly', exam: await Exam.findById({ _id: req.query.examId }) });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor delete exams and questions
    static async deleteExam(req, res) {
        try {
            let checkExam = await Exam.findById({ _id: req.query.examId });
            if (checkExam) {
                await Exam.deleteOne({ _id: req.query.examId });
                await Question.deleteMany({ examId: req.query.examId });
                return res.status(200).send({ success: true, msg: 'Exam Deleted Successfuly' });
            } else {
                return res.status(401).send({ success: false, msg: 'Exam does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    static async submitAnswer(req, res) {
        try {
            let checkAnswer = await Answer.find({ 
                $and: [
                    { questionId: req.body.questionId },
                    { studentId: req.body.studentId }
                ]
            });
            if (!checkAnswer[0]) {

                let questionId = req.body.questionId;
                let studentId = req.body.studentId;
                let examId = req.body.examId;
                let markedOption = req.body.markedOption;

                let answer = new Answer({
                    questionId: mongoose.Types.ObjectId(questionId),
                    studentId: mongoose.Types.ObjectId(studentId),
                    examId: mongoose.Types.ObjectId(examId),
                    markedOption: markedOption
                });

                await answer.save();
                return res.status(200).send({ success: true, msg: 'Answer Submitted Successfuly' });
            } else {
                return res.status(401).send({ success: false, msg: 'Answer Already Submitted' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    static async getAnswers(req, res) {
        try {
            let answers = await Answer.find({
                $and: [
                    { examId: mongoose.Types.ObjectId(req.query.examId) },
                    { studentId: mongoose.Types.ObjectId(req.query.studentId) }
                ]
            });

            if(answers[0]) {
                return res.status(200).send({ success: true, msg: 'Answers Fetched Successfuly', answers: answers });
            } else {
                return res.status(401).send({ success: false, msg: 'Answers not found' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }
}

module.exports = { ExamController }