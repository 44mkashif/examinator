'use strict'

const mongoose = require('mongoose');

let examSchema = new mongoose.Schema(
    {
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
examSchema.index({courseId: 1}, {unique: true});
let Exam = mongoose.model('Exam', examSchema);

module.exports = { Exam }