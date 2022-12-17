const { UNAUTHORIZED } = require('../constants/statusCode');

const validateToken = (req, res, next) => {
  const { token } = req.headers;
  const tokenRequired = 'Token não encontrado';
  const tokenInvalid = 'Token inválido';

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: tokenRequired });
  }

  if (token.length !== 16 || typeof token !== 'string') {
    return res.status(UNAUTHORIZED).json({ message: tokenInvalid });
  }

  return next();
};

module.exports = { validateToken };
