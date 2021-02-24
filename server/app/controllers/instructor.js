const { Instructor } = require('./../models/instructor');
const statusCodes = require("./../constants/statusCodes");
const messages = require("./../constants/messages");
const { hashPassword, passwordValidity } = require("./../functions/helpers");
const { AuthMiddleware } = require('./../middlewares/AuthMiddleware');

const create = async (req, res) => {
    try {
        let checkInstructor = await Instructor.findOne({ email: req.body.email });
        if (checkInstructor) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: messages.ResourceExist
            })
        } else {
            req.body.password = await hashPassword(req.body.password);

            var instructor = new Instructor({
                fName: req.body.fname,
                lName: req.body.lname,
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email
            });

            await instructor.save();

            return res.status(statusCodes.CREATED).json({
                success: true,
                message: messages.ResourceCreated,
                data: instructor
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
        let checkInstructor = await Instructor.findOne({ _id: req.params.id });
        console.log(checkInstructor)
        if (checkInstructor) {
            await Instructor.deleteOne({ _id: req.params.id })
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
        return res.status(statusCodes.BAD_REQUEST).json({ success: false, err: error })
    }
}

const login = async (req, res) => {
    try {
        let instructor = await Instructor.findOne({ email: req.body.email });
        if (instructor) {
            const validPassword = await passwordValidity(req.body.password, instructor.password);
            if (validPassword) {
                let token = await AuthMiddleware.generateToken(instructor._id);
                await Instructor.findByIdAndUpdate({ _id: instructor._id },
                    {
                        $set: {
                            authToken: token
                        }
                    }
                )
                return res.status(statusCodes.OK).json({
                    success: true,
                    token: token,
                    data: instructor
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