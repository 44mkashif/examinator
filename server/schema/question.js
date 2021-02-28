'use strict'

const mongoose = require('mongoose');

let questionSchema = new mongoose.Schema(
    {
        statement: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        correctOption: {
            type: String,
            required: true
        },
        marks: {
            type: Number,
            required: true
        },
        examId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'exams'
        }
    },
    {
        timestamps: true
    }
);

let Question = mongoose.model('Question', questionSchema);

module.exports = { Question }