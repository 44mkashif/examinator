'use strict'

const express = require('express');
const { CourseController } = require('../controllers/CourseController');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');

const router = express.Router();

router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);
router.get('/get-image', StudentController.getStudentImage);
router.get('/exam', ExamController.getExam);

module.exports = router