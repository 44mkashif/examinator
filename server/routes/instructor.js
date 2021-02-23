'use strict'

const express = require('express');
const { StudentController } = require('../controllers/instructor/StudentController');

const router = express.Router();

router.post('/addStudent', StudentController.addStudent);
router.delete('/deleteStudent', StudentController.deleteStudent);

module.exports = router