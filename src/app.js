const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const routers = require("./routers/routers");
const ErrorHandler = require("./middlewares/error_handler");

// Create Express App
const app = express();

// Load Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Load Routers
app.use("/v1", routers);

// Load Error Handler
app.use(ErrorHandler.prismaErrorHandler);
app.use(ErrorHandler.errorHandler);

module.exports = app;
