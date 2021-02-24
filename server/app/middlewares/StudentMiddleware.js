'use strict'

const { Student } = require('./../models/student');
const jwt = require('jsonwebtoken');

class StudentMiddleware {
    static isAuthorized(req, res, next) {
        try {
            let token = req.header('auth-token');
            jwt.verify(token, '3xaw!uAf0r$3cr3t', (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(403).send({ success: false, msg: 'Invalid Token Request' })
                } else {
                    req.id = decoded._id;
                    let student = Student.findOne({ $and: [{ _id: req.id }, { authToken: token }] });
                    if (student) {
                        next();
                    } else {
                        return res.status(403).send({ success: false, msg: 'Invalid Token Request' })
                    }
                }
            })
        } catch (error) {
            return res.status(400).send({ success: false, msg: error });
        }
    }
}

module.exports = { StudentMiddleware }