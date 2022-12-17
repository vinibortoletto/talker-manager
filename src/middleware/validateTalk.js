const { BAD_REQUEST } = require('../constants/statusCode');

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const talkRequired = 'O campo "talk" é obrigatório';

  if (!talk) {
    return res.status(BAD_REQUEST).json({ message: talkRequired });
  }

  return next();
};

module.exports = { validateTalk };
