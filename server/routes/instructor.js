'use strict'

const express = require('express');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');

const router = express.Router();

//APIs: Creating and Deleting Student Accounts
router.post('/addStudent', StudentController.addStudent);
router.delete('/deleteStudent', StudentController.deleteStudent);

//Exam CRUD APIs
router.post('/exam', ExamController.addExam);
router.get('/exam', ExamController.getExam);
router.put('/exam', ExamController.updateExam);
router.delete('/exam', ExamController.deleteExam);

module.exports = router