const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

// Routers
const publicRouter = require("./routers/public");
const privateRouter = require("./routers/private");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use("/v1", publicRouter);
app.use("/v1", privateRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
