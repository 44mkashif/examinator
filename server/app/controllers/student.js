const { Student } = require('./../models/student');
const statusCodes = require("./../constants/statusCodes");
const messages = require("./../constants/messages");
const { hashPassword, passwordValidity } = require("./../functions/helpers");
const { AuthMiddleware } = require('./../middlewares/AuthMiddleware');

const create = async (req, res) => {
    try {
        let checkStudent = await Student.findOne({ email: req.body.email });
        if (checkStudent) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: messages.ResourceExist
            })
        } else {
            req.body.password = await hashPassword(req.body.password);

            var student = new Student({
                fName: req.body.fname,
                lName: req.body.lname,
                regNo: req.body.regNo,
                password: req.body.password,
                email: req.body.email
            });

            await student.save();

            return res.status(statusCodes.CREATED).json({
                success: true,
                message: messages.ResourceCreated,
                data: student
            });
        }
    } catch (err) {
        res.status(statusCodes.BAD_REQUEST).json({
            success: false,
            err: err
        });
    };
}

const retrieve = (req, res) => {

}

const list = (req, res) => {

}

const update = (req, res) => {

}

const destroy = async (req, res) => {
    try {
        let checkStudent = await Student.findOne({ _id: req.params.id });
        if (checkStudent) {
            await Student.deleteOne({ _id: req.params.id })
            return res.status(statusCodes.OK).json({
                success: true,
                message: messages.ResourceDestroyed
            });
        } else {
            res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: messages.ResourceNotFound
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(statusCodes.BAD_REQUEST).json({
            success: false,
            err: err
        })
    }
}

const login = async (req, res) => {
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            const validPassword = await passwordValidity(req.body.password, student.password);
            if (validPassword) {
                let token = await AuthMiddleware.generateToken(student._id);
                await Student.findByIdAndUpdate({ _id: student._id },
                    {
                        $set: {
                            authToken: token
                        }
                    }
                )
                return res.status(statusCodes.OK).json({
                    success: true,
                    token: token,
                    data: student
                })
            } else {
                return res.status(statusCodes.UNAUTHORIZED).json({
                    success: false,
                    msg: messages.loginFailed
                })
            }
        } else {
            return res.status(statusCodes.UNAUTHORIZED).json({
                success: false,
                msg: messages.invalidEmail
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(statusCodes.BAD_REQUEST).send({
            success: false,
            msg: error
        });
    }
}

module.exports = {
    create,
    retrieve,
    list,
    update,
    destroy,
    login
}