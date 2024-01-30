const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const routers = require("./routers/routers");

// Create Express App
const app = express();

// Load Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Load Routers
app.use("/v1", routers);

// Start Express App
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
