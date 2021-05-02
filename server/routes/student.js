'use strict'

const express = require('express');
const { CourseController } = require('../controllers/CourseController');
const { ExamController } = require('../controllers/ExamController');
const { ResultController } = require('../controllers/ResultController');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');

const router = express.Router();

router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);

router.get('/exam', ExamController.getExam);
router.get('/exams', ExamController.getExams);
router.post('/submit-answer', ExamController.submitAnswer);

router.get('/get-image', StudentController.getStudentImage);

router.post('/add-result', ResultController.addResult);
router.get('/result', ResultController.getResultForStudent);

module.exports = router