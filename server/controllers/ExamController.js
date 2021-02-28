'use strict'

const { Exam } = require('../schema/exam');
const { Question } = require('../schema/question');

const mongoose = require('mongoose')

class ExamController {

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
}

module.exports = { ExamController }