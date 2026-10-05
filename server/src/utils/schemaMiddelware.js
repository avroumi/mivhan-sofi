export const validateMiddleware = (schema, key = "body") => {
  return (req, res, next) => {
    try {
      schema.parse(req[key]);

      next();
    } catch (error) {
      next(error);
    }
  };
};
