const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ error: err });
};

const prismaErrorHandler = (err, req, res, next) => {
  if (err.name === "PrismaClientKnownRequestError") {
    if (err.code === "P2025") {
      const modelName = err.meta.modelName;
      return res.status(404).json({ message: `${modelName} not found` });
    }
  }

  next(err);
};

module.exports = {
  errorHandler,
  prismaErrorHandler,
};
