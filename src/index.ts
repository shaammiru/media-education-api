import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

// Error handling middleware
import {
  jsonErrorHandler,
  joiErrorHandler,
  prismaErrorHandler,
  errorHandler,
  multerErrorHandler,
} from "./middleware/errorHandler";

// Routes
import router from "./router/router";

const app = express();

// Load middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());

const baseEndpoint =
  process.env.NODE_ENV === "development" ? "/api/dev" : "/api";

// Load static files
app.use(
  `${baseEndpoint}/uploads`,
  express.static(path.join(__dirname, `../${process.env.STATIC_DIR}`))
);

// Load routes
app.use(`${baseEndpoint}/v1`, router);

// Load error handler middlewares
app.use(jsonErrorHandler);
app.use(joiErrorHandler);
app.use(prismaErrorHandler);
app.use(multerErrorHandler);
app.use(errorHandler);

// Run the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
