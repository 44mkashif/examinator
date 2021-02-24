module.exports = (app) => {
    app.use("/api/instructor", require("./instructor")),
        app.use("/api/student", require("./student"))
    // app.use("/api/admin", require("./admin"))
}