const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
});

const validateParams = async (req, res, next) => {
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const validData = await schema.validateAsync(data);
      console.log(validData);
      req.body.validData = validData;

      next();
    } catch (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  };
};

module.exports = {
  validateParams,
  validateBody,
};
