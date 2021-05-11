'use strict'

const express = require('express');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');
const { CourseController } = require('../controllers/CourseController');
const { ResultController } = require('../controllers/ResultController');

const router = express.Router();

//APIs: Creating and Deleting Student Accounts
router.post('/addStudent', StudentController.addStudent);
router.delete('/deleteStudent', StudentController.deleteStudent);
router.get('/student-details', StudentController.getStudentDetails);

//Exam CRUD APIs
router.post('/exam', ExamController.addExam);
router.get('/exam', ExamController.getExam);
router.get('/exams', ExamController.getExams);
router.put('/exam', ExamController.updateExam);
router.put('/hall-created', ExamController.hallCreated);
router.delete('/exam', ExamController.deleteExam);

//Course CRUD APIs
router.post('/course', CourseController.addCourse);
router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);
router.put('/course', CourseController.updateCourse);
router.delete('/course', CourseController.deleteCourse);

router.get('/results', ResultController.getResultForInstructor);

module.exports = router