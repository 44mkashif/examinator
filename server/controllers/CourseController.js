'use strict'

const { Course } = require('./../schema/course');

const mongoose = require('mongoose');

class CourseController {

    //Instructor can Create Course
    static async addCourse(req, res) {
        try {
            let checkCourse = await Course.findOne({ courseCode: req.body.courseCode });
            if (checkCourse) {
                return res.status(401).send({ success: false, msg: 'Course Already Exits' });
            } else {
                let courseName = req.body.courseName;
                let courseCode = req.body.courseCode;
                let creditHours = req.body.creditHours;
                let faculty = req.body.faculty;
                let instructorId = req.body.instructorId;

                let course = new Course({
                    courseName: courseName,
                    courseCode: courseCode,
                    creditHours: creditHours,
                    faculty: faculty,
                    instructorId: mongoose.Types.ObjectId(instructorId)
                });
                await course.save();
                return res.status(200).send({ success: true, msg: 'Course Added Successfuly', course: await Course.findOne({ courseCode: courseCode }) });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor Get Courses by its id
    static async getCourses(req, res) {
        try {
            let courses = await Course.aggregate([
                {
                    $match: {
                        instructorId: mongoose.Types.ObjectId(req.query.instructorId)
                    }
                }
            ]);
            if (courses) {
                return res.status(200).send({ success: true, msg: 'Courses Fetched Successfuly', courses: courses });
            } else {
                return res.status(401).send({ success: false, msg: 'Courses does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor Get Course by code
    static async getCourse(req, res) {
        try {
            let course = await Course.findOne({ _id: mongoose.Types.ObjectId(req.query.courseId) });
            if (course) {
                return res.status(200).send({ success: true, msg: 'Course Fetched Successfuly', course: course });
            } else {
                return res.status(401).send({ success: false, msg: 'Course does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor can update course
    static async updateCourse(req, res) {
        try {
            let checkCourse = await Course.findById({ _id: req.body.courseId });
            if (!checkCourse) {
                return res.status(401).send({ success: false, msg: 'Course does not exist!' });
            } else {
                let courseName = req.body.courseName;
                let courseCode = req.body.courseCode;
                let creditHours = req.body.creditHours;
                let faculty = req.body.faculty;

                await Course.findOneAndUpdate({ _id: req.body.courseId }, {
                    $set: {
                        courseName: courseName,
                        courseCode: courseCode,
                        creditHours: creditHours,
                        faculty: faculty
                    }
                });
                return res.status(200).send({ success: true, msg: 'Course Updated Successfuly', course: await Course.findOne({ _id: req.body.courseId }) });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    //Instructor can delete course
    static async deleteCourse(req, res) {
        try {
            let checkCourse = await Course.findOne({ _id: req.query.courseId });
            if (checkCourse) {
                await Course.deleteOne({ _id: req.query.courseId });
                return res.status(200).send({ success: true, msg: 'Course Deleted Successfuly' });
            } else {
                return res.status(401).send({ success: false, msg: 'Course does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

}

module.exports = { CourseController }