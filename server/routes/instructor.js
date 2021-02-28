'use strict'

const express = require('express');
const { StudentController } = require('../controllers/StudentController');
const { ExamController } = require('../controllers/ExamController');

const router = express.Router();

router.post('/addStudent', StudentController.addStudent);
router.delete('/deleteStudent', StudentController.deleteStudent);

router.post('/addExam', ExamController.addExam);

module.exports = router