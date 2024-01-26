const privateRouter = require("express").Router();

privateRouter.use((req, res, next) => {
  console.log("Private route hit.");
  next();
});

privateRouter.get("/priv", (req, res) => {
  res.send("Hello from private route.");
});

module.exports = privateRouter;
