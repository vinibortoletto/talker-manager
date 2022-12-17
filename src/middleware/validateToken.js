const { UNAUTHORIZED } = require('../constants/statusCode');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenNotFound = 'Token não encontrado';
  const tokenInvalid = 'Token inválido';

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: tokenNotFound });
  }

  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(UNAUTHORIZED).json({ message: tokenInvalid });
  }

  return next();
};

module.exports = { validateToken };
