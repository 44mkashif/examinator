'use strict'

const express = require('express');
const { InstructorController } = require('../controllers/InstructorController');

const router = express.Router();

router.post('/addInstructor', InstructorController.addInstructor);
router.delete('/deleteInstructor', InstructorController.deleteInstructor);

module.exports = router