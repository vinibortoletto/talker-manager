const { BAD_REQUEST } = require('../constants/statusCode');

const validateDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const watchedAtRequired = 'O campo "watchedAt" é obrigatório';
  const watchedAtInvalid = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
    return res.status(BAD_REQUEST).json({ message: watchedAtRequired });
  }

  if (!dateRegex.test(watchedAt)) {
    return res.status(BAD_REQUEST).json({ message: watchedAtInvalid });
  }

  return next();
};

module.exports = { validateDate };