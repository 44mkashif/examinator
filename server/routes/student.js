'use strict'

const express = require('express');
const { CourseController } = require('../controllers/CourseController');
const { ExamController } = require('../controllers/ExamController');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');

const router = express.Router();

router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);

router.get('/exam', ExamController.getExam);
router.get('/exams', ExamController.getExams);

router.get('/get-image', StudentController.getStudentImage);

module.exports = router