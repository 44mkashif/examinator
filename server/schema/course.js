'use strict'

const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        courseCode: {
            type: String,
            required: true
        },
        creditHours: {
            type: Number,
            required: true
        },
        faculty: {
            type: String,
            required: true
        },
        instructorId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'instructors'
        }
    },
    {
        timestamps: true
    }
);

courseSchema.index({courseCode: 1}, {unique: true});
let Course = mongoose.model('Course', courseSchema);

module.exports = { Course }