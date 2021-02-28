'use strict'

const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema(
    {
        name: {
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

adminSchema.index({email: 1}, {unique: true});
let Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }