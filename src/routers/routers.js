const routers = require("express").Router();
const accountRouter = require("./account_router");

routers.use("/accounts", accountRouter);

module.exports = routers;
