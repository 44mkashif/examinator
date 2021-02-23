'use strict'

const express = require('express');
const { InstructorController } = require('../controllers/admin/InstructorController');

const router = express.Router();

router.post('/addInstructor', InstructorController.addInstructor);
router.delete('/deleteInstructor', InstructorController.deleteInstructor);

module.exports = router