const { BAD_REQUEST } = require('../constants/statusCode');

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const rateRequired = 'O campo "rate" é obrigatório';
  const rateMustBeInteger = 'O campo "rate" deve ser um inteiro de 1 à 5';

  if (!rate) {
    return res.status(BAD_REQUEST).json({ message: rateRequired });
  }
  
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST).json({ message: rateMustBeInteger });
  }

  return next();
};

module.exports = { validateRate };