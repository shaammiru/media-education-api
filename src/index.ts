import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

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

// Load static files
app.use(
  "/api/dev/uploads",
  express.static(path.join(__dirname, `../${process.env.STATIC_DIR}`))
);

// Load routes
app.use("/api/dev/v1", router);

// Load swagger documentation
app.use(
  "/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.3/swagger-ui.css",
  })
);

// Load error handler middlewares
app.use(jsonErrorHandler);
app.use(joiErrorHandler);
app.use(prismaErrorHandler);
app.use(multerErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
