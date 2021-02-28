'use strict'

const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        regNo: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        authToken: String
    },
    {
        timestamps: true
    }
);

studentSchema.index({ email: 1 }, { unique: true });
let Student = mongoose.model('Student', studentSchema);

module.exports = { Student }