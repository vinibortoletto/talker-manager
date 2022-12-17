const { BAD_REQUEST } = require('../constants/statusCode');

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRequired = 'O campo "password" é obrigatório';
  const passwordMinLength = 'O "password" deve ter pelo menos 6 caracteres';

  if (!password) {
    return res.status(BAD_REQUEST).json({ message: passwordRequired });
  }

  if (password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: passwordMinLength });
  }

  return next();
};

module.exports = { validatePassword };
