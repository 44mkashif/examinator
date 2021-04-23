'use strict'

const mongoose = require('mongoose');

let examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        courseId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'courses'
        },
        duration: {
            type: Number,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        totalMarks: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);
let Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam }