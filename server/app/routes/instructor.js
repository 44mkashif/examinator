const Router = require("express").Router();
const InstructorController = require("./../controllers").Instructor;
const { methodNotAllowed } = require("./../functions/requests");
const { InstructorMiddleware } = require('./../middlewares/InstructorMiddleware');

// Router.get("/", InstructorController.list);
// Router.get("/:id", InstructorController.retrieve);
Router.post("/", InstructorController.create);
// Router.put("/:id", adminAuth, InstructorController.update);
Router.delete("/:id", InstructorController.destroy);

Router.post("/login", InstructorController.login);
// Router.get("/auth/me", studentAuth, InstructorController.getStudentFromAuth);

Router.all('/', methodNotAllowed);
Router.all('/:id', methodNotAllowed);

module.exports = Router;