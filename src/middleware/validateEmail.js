const { BAD_REQUEST } = require('../constants/statusCode');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailRequired = 'O campo "email" é obrigatório';
  const emailInvalid = 'O "email" deve ter o formato "email@email.com"';

  if (!email) {
    return res.status(BAD_REQUEST).json({ message: emailRequired });
  }

  if (!emailRegex.test(email)) {
    return res.status(BAD_REQUEST).json({ message: emailInvalid });
  }

  return next();
};

module.exports = { validateEmail };
