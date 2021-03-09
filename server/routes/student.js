'use strict'

const express = require('express');
const { CourseController } = require('../controllers/CourseController');

const router = express.Router();

router.get('/courses', CourseController.getCourses);

module.exports = router