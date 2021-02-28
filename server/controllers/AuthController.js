'use strict'

const { Instructor } = require('./../schema/instructor');
const { Student } = require('./../schema/student');
const { AuthMiddleware } = require('./../middlewares/AuthMiddleware');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class AuthController {
    
    static async loginAdmin(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    static async loginInstructor(req, res) {
        try {
            let instructor = await Instructor.findOne({email: req.body.email});
            if(instructor) {
                if(bcrypt.compareSync(req.body.password, instructor.password)){
                    let token = await AuthMiddleware.generateToken(instructor._id);
                    await Instructor.findByIdAndUpdate({_id: instructor._id},
                        {
                            $set: {
                                authToken: token
                            }
                        }    
                    )
                    return res.status(200).send({success: true, msg: 'Logged in Successfuly', token: token, instructor: instructor})
                } else {
                    return res.status(401).send({success: false, msg: 'Incorrect Password'})
                }
            } else {
                return res.status(401).send({success: false, msg: 'Instructor does not exist'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    static async loginStudent(req, res) {
        try {
            let student = await Student.findOne({email: req.body.email});
            if(student) {
                if(bcrypt.compareSync(req.body.password, student.password)){
                    let token = AuthMiddleware.generateToken(student._id);
                    await Student.findByIdAndUpdate({_id: student._id},
                        {
                            $set: {
                                authToken: token
                            }
                        }    
                    )
                    return res.status(200).send({success: true, msg: 'Logged in Successfuly', token: token, student: student})
                } else {
                    return res.status(401).send({success: false, msg: 'Incorrect Password'})
                }
            } else {
                return res.status(401).send({success: false, msg: 'Student does not exist'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    static async instructorCheckAuth(req, res) {
        try {
            let token = req.header('auth-token');
            let decodedToken = AuthMiddleware.decodeToken(token);
            if(decodedToken) {
                let instructor = await Instructor.findOne({_id: mongoose.Types.ObjectId(decodedToken._id)});
                if(instructor) {
                    return res.status(200).send({success: true, msg: 'Authentication Successful'});
                } else {
                    return res.status(401).send({success: false, msg: 'Authentication Failed'})
                }
            } else {
                return res.status(401).send({success: false, msg: 'Token Invalid'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    static async studentCheckAuth(req, res) {
        try {
            let token = req.header('auth-token');
            let decodedToken = AuthMiddleware.decodeToken(token);
            if(decodedToken) {
                let student = await Student.findOne({_id: mongoose.Types.ObjectId(decodedToken._id)});
                if(student) {
                    return res.status(200).send({success: true, msg: 'Authentication Successful'});
                } else {
                    return res.status(401).send({success: false, msg: 'Authentication Failed'})
                }
            } else {
                return res.status(401).send({success: false, msg: 'Token Invalid'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }
}

module.exports = { AuthController }