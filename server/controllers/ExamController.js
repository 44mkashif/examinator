'use strict'

const { Exam } = require('../schema/exam');
const { Question } = require('../schema/question');

const mongoose = require('mongoose')

class ExamController {


    //Instructor Create Exam
    static async addExam(req, res){
        try {
            let checkExam = await Exam.findOne({courseId: req.body.courseId});
            if(checkExam) {
                return res.status(401).send({success: false, msg: 'Exam Already Exits'});
            } else {
                let courseId = req.body.courseId;
                let duration = req.body.duration;
                let startTime = Date(req.body.startTime);
                let endTime = Date(req.body.endTime);
                let totalMarks = req.body.totalMarks;
                
                let exam = new Exam({
                    courseId: mongoose.Types.ObjectId(courseId),
                    duration: duration,
                    startTime: startTime,
                    endTime: endTime,
                    totalMarks: totalMarks
                });
                await exam.save();
                let examStored = await Exam.findOne({courseId: courseId}); 
                var questions = [];
                req.body.questions.forEach((question)=>{
                    questions.push({
                        statement: question.statement,
                        options: question.options, 
                        correctOption: question.correctOption,
                        marks: question.marks,
                        examId: mongoose.Types.ObjectId(examStored._id)
                    })
                })
                await Question.insertMany(questions);
                return res.status(200).send({success: true, msg: 'Exam Added Successfuly', exam: await Exam.findOne({courseId: courseId})});
            }
            

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    //Instructor Get Exam of specific course by its id
    static async getExam(req, res) {
        try {
            let exam = await Exam.aggregate([
                {
                    $match: { 
                        courseId: mongoose.Types.ObjectId(req.query.courseId) 
                    }
                },
                {
                    $lookup: {
                        from: "questions",
                        localField: "_id",
                        foreignField: "examId",
                        as: "question"
                    }
                }
            ]);
            if(exam[0]) {
                return res.status(200).send({success: true, msg: 'Exam Fetched Successfuly', exam: exam[0]});
            } else {
                return res.status(401).send({success: false, msg: 'Exam does not exist!'})
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    //Instructor update exam and questions
    static async updateExam(req, res){
        try {
            let checkExam = await Exam.findOne({courseId: req.body.courseId});
            if(!checkExam) {
                return res.status(401).send({success: false, msg: 'Exam does not exist!'});
            } else {
                let duration = req.body.duration;
                let startTime = Date(req.body.startTime);
                let endTime = Date(req.body.endTime);
                let totalMarks = req.body.totalMarks;
                
                await Exam.findOneAndUpdate({ courseId: req.body.courseId }, {
                    $set: {
                        duration: duration,
                        startTime: startTime,
                        endTime: endTime,
                        totalMarks: totalMarks
                    }
                });
                await Question.deleteMany({examId: checkExam._id})
                var questions = [];
                req.body.questions.forEach((question)=>{
                    questions.push({
                        statement: question.statement,
                        options: question.options, 
                        correctOption: question.correctOption,
                        marks: question.marks,
                        examId: mongoose.Types.ObjectId(checkExam._id)
                    })
                })
                await Question.insertMany(questions);
                return res.status(200).send({success: true, msg: 'Exam Updated Successfuly', exam: await Exam.findOne({courseId: courseId})});
            }
            

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    //Instructor delete exams and questions
    static async deleteExam(req, res) {
        try {
            let checkExam = await Exam.findOne({courseId: req.query.courseId});
            if(checkExam) {
                let examId = checkExam._id;
                await Exam.deleteOne({courseId: req.query.courseId});
                await Question.deleteMany({examId: examId});
                return res.status(200).send({success: true, msg: 'Exam Deleted Successfuly'});
            } else {
                return res.status(401).send({success: false, msg: 'Exam does not exist!'})
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }
}

module.exports = { ExamController }