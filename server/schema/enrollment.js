'use strict'

const mongoose = require('mongoose');

let enrollmentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'students'
        },
        courseId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'courses'
        },
        academicYear: {
            type: Number,
            required: true
        },
        semester: {
            type: Number,
            required: true
        },
        dateEnrolled: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

let Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = { Enrollment }