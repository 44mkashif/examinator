'use strict'

const mongoose = require('mongoose');

let instructorSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
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

instructorSchema.index({email: 1}, {unique: true});
let Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = { Instructor }