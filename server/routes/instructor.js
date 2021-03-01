'use strict'

const express = require('express');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');
const { CourseController } = require('../controllers/CourseController');

const router = express.Router();

//APIs: Creating and Deleting Student Accounts
router.post('/addStudent', StudentController.addStudent);
router.delete('/deleteStudent', StudentController.deleteStudent);

//Exam CRUD APIs
router.post('/exam', ExamController.addExam);
router.get('/exam', ExamController.getExam);
router.put('/exam', ExamController.updateExam);
router.delete('/exam', ExamController.deleteExam);

//Course CRUD APIs
router.post('/course', CourseController.addCourse);
router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);
router.put('/course', CourseController.updateCourse);
router.delete('/course', CourseController.deleteCourse);

module.exports = router