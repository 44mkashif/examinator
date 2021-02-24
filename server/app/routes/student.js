const Router = require("express").Router();
const StudentController = require("./../controllers").Student;
const { methodNotAllowed } = require("./../functions/requests");
const { StudentMiddleware } = require('./../middlewares/StudentMiddleware');

// Router.get("/", StudentController.list);
// Router.get("/:id", StudentController.retrieve);
Router.post("/", StudentController.create);
// Router.put("/:id", adminAuth, StudentController.update);
Router.delete("/:id", StudentController.destroy);

Router.post("/login", StudentController.login);
// Router.get("/auth/me", studentAuth, StudentController.getStudentFromAuth);

Router.all('/', methodNotAllowed);
Router.all('/:id', methodNotAllowed);

module.exports = Router;