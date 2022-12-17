const { BAD_REQUEST } = require('../constants/statusCode');

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const rateRequired = 'O campo "rate" é obrigatório';
  const rateMustBeInteger = 'O campo "rate" deve ser um inteiro de 1 à 5';
  const rateList = [1, 2, 3, 4, 5];

  if (rate === undefined) {
    return res.status(BAD_REQUEST).json({ message: rateRequired });
  }
  
  if (!rateList.includes(rate)) {
    return res.status(BAD_REQUEST).json({ message: rateMustBeInteger });
  }

  return next();
};

module.exports = { validateRate };