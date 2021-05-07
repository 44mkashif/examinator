'use strict'

const { Student } = require('../schema/student');
const bcrypt = require('bcrypt');

class StudentController {

    static async addStudent(req, res) {
        try {
            let checkStudent = await Student.findOne({ email: req.body.email });
            if (checkStudent) {
                return res.status(401).send({ success: false, msg: 'Student Already Exits' });
            } else {
                let fname = req.body.fname;
                let lname = req.body.lname;
                let regNo = req.body.regNo;
                let email = req.body.email;
                let imgUrl = req.body.imgUrl;
                let password = bcrypt.hashSync(req.body.password, 10);

                var student = new Student({
                    fName: fname,
                    lName: lname,
                    regNo: regNo,
                    password: password,
                    email: email,
                    imgUrl: imgUrl
                });

                await student.save();
                return res.status(401).send({ success: true, msg: 'Student Added Successfuly', student: await Student.findOne({ email: email }) });
            }


        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    static async getStudentImage(req, res) {
        try {
            let student = await Student.findById({ _id: req.query.userId });
            return res.status(200).send({ success: true, msg: 'imgURL fetched Successfuly', imgURL: student.imgUrl });
        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }

    static async deleteStudent(req, res) {
        try {
            let checkStudent = await Student.findOne({ _id: req.query.id });
            if (checkStudent) {
                await Student.deleteOne({ _id: req.query.id })
                return res.status(200).send({ success: true, msg: 'Student Deleted Successfuly' });
            } else {
                res.status(401).send({ success: false, msg: 'Student does not exist!' })
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, msg: error });
        }
    }
}

module.exports = { StudentController }