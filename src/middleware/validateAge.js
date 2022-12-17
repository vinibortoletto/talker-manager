const { BAD_REQUEST } = require('../constants/statusCode');

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const ageRequired = 'O campo "age" é obrigatório';
  const minAge = 'A pessoa palestrante deve ser maior de idade';

  if (!age) {
    return res.status(BAD_REQUEST).json({ message: ageRequired });
  }

  if (age < 18) {
    return res.status(BAD_REQUEST).json({ message: minAge });
  }

  return next();
};

module.exports = { validateAge };
