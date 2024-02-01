import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

// Error handling middleware
import {
  joiErrorHandler,
  prismaErrorHandler,
  errorHandler,
} from "./middleware/errorHandler";

// Routes
import router from "./router/router";

const app = express();

// Load middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Load routes
app.use("/v1", router);

// Load error handler middlewares
app.use(joiErrorHandler);
app.use(prismaErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
