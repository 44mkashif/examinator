'use strict'

const { Instructor } = require('../schema/instructor');
const bcrypt = require('bcrypt');

class InstructorController {

    static async addInstructor(req, res){
        try {
            let checkInstructor = await Instructor.findOne({email: req.body.email});
            if(checkInstructor) {
                return res.status(401).send({success: false, msg: 'Instructor Already Exits'});
            } else {
                let fname = req.body.fname;
                let lname = req.body.lname;
                let username = req.body.username;
                let email = req.body.email;
                let password = bcrypt.hashSync(req.body.password, 10);
                
                var instructor = new Instructor({
                    fName: fname,
                    lName: lname,
                    userName: username,
                    password: password,
                    email: email
                });

                await instructor.save();
                return res.status(200).send({success: true, msg: 'Instructor Added Successfuly', instructor: await Instructor.findOne({email: email})});
            }
            

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }

    static async deleteInstructor(req, res) {
        try {
            let checkInstructor = await Instructor.findOne({_id: req.query.id});
            if(checkInstructor) {
                await Instructor.deleteOne({_id: req.query.id})
                return res.status(200).send({success: true, msg: 'Instructor Deleted Successfuly'});
            } else {
                res.status(401).send({success: false, msg: 'Instructor does not exist!'})
            }

        } catch (error) {
            console.log(error)
            return res.status(400).send({success: false, msg: error});
        }
    }
}

module.exports = { InstructorController }