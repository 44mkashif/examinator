'use strict'

const { Exam } = require('../schema/exam');
const { Question } = require('../schema/question');
const { Answer } = require('../schema/answer');
const { Result } = require('../schema/result');

const mongoose = require('mongoose');

class ResultController {

    static async addResult(req, res) {
        try {
            
            let examId = req.body.examId;
            let studentId = req.body.studentId;
            let totalMarks = req.body.totalMarks;
            let obtainedMarks = req.body.obtainedMarks;

            let result = new Result({
                examId: mongoose.Types.ObjectId(examId),
                studentId: mongoose.Types.ObjectId(studentId),
                totalMarks: totalMarks,
                obtainedMarks: obtainedMarks
            });

            let resultStored = await result.save();

            return res.status(200).send({ success: true, msg: 'Result Added Successfuly', result: resultStored});
        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }
    
    static async getResultForInstructor(req, res) {
        try {
            let result = await Result.aggregate([
                {
                    $match: {
                        examId: mongoose.Types.ObjectId(req.query.examId)
                    }
                }
            ]);
            if(result[0]){
                return res.status(200).send({ success: true, msg: 'Result Fetched Successfuly', result: result});
            } else {
                return res.status(401).send({ success: false, msg: 'No Result Found'});
            }
        
        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    static async getResultForStudent(req, res) {
        try {
            let result = await Result.aggregate([
                {
                    $match: {
                        $and: [
                            {examId: mongoose.Types.ObjectId(req.query.examId)},
                            {studentId: mongoose.Types.ObjectId(req.query.studentId)}
                        ]
                    }
                }
            ]);
            if(result[0]){
                return res.status(200).send({ success: true, msg: 'Result Fetched Successfuly', result: result});
            } else {
                return res.status(401).send({ success: false, msg: 'No Result Found'});
            }
        
        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

}

module.exports = { ResultController }