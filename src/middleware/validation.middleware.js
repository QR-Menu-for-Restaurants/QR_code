export const ValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      const path = req.path.includes('register') ? 'register' :
                   req.path.includes('login') ? 'login' :
                   req.path.includes('reset-password') ? 'reset-password' :
                   req.path.includes('forgot-password') ? 'forgot-password' :
                   null;

      if (path) {
        return res.status(400).render(path, {
          errors: errorMessages,
          formData: req.body
        });
      }
      return res.status(400).json({ message: errorMessages.join(', ') });
    }

    req.body = value;
    next();
  };
};
