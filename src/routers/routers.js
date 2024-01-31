const routers = require("express").Router();
const accountRouter = require("./account_router");
// const webinarRouter = require("./webinar_router");

routers.use("/accounts", accountRouter);
// routers.use("/webinars", webinarRouter);

module.exports = routers;
