'use strict'

const express = require('express');

const { AuthController } = require('./../controllers/AuthController');
const { InstructorMiddleware } = require('./../middlewares/InstructorMiddleware');
const { StudentMiddleware } = require('./../middlewares/StudentMiddleware');

const adminRoutes = require('./admin');
const instructorRoutes = require('./instructor');
const studentRoutes = require('./student')

const router = express.Router();

router.use('/admin', adminRoutes);

router.post('/login-instructor', AuthController.loginInstructor);
router.post('/check-instructor-auth', AuthController.instructorCheckAuth);
router.use('/instructor', InstructorMiddleware.isAuthorized, instructorRoutes);

router.post('/login-student', AuthController.loginStudent);
router.post('/check-student-auth', AuthController.studentCheckAuth);
router.use('/student', StudentMiddleware.isAuthorized, studentRoutes);

module.exports = router