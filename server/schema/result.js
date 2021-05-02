'use strict'

const mongoose = require('mongoose');

let resultSchema = new mongoose.Schema(
    {
        examId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'exams'
        },
        studentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'students'
        },
        totalMarks: {
            type: Number,
            required: true
        },
        obtainedMarks: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);
let Result = mongoose.model('Result', resultSchema);

module.exports = { Result }