const { BAD_REQUEST } = require('../constants/statusCode');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const nameRequired = 'O campo "name" é obrigatório';
  const nameMinLength = 'O "name" deve ter pelo menos 3 caracteres';

  if (!name) {
    return res.status(BAD_REQUEST).json({ message: nameRequired });
  }

  if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: nameMinLength });
  }

  return next();
};

module.exports = { validateName };
