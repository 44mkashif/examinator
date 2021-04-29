'use strict'

const express = require('express');
const { CourseController } = require('../controllers/CourseController');
const { StudentController } = require('../controllers/StudentController');

const router = express.Router();

router.get('/courses', CourseController.getCourses);
router.get('/course', CourseController.getCourse);
router.get('/get-image', StudentController.getStudentImage);

module.exports = router