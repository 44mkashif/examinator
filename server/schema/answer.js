'use strict'

const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'questions'
        },
        studentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'students'
        },
        examId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'exams'
        },
        markedOption: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);
let Answer = mongoose.model('Answer', answerSchema);

module.exports = { Answer }