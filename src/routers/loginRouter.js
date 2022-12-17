const { Router } = require('express');
const { OK } = require('../constants/statusCode');
const { validateEmail, validatePassword } = require('../middleware');
const { generateToken } = require('../utils');

const router = Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  async (_req, res) => {
    const token = generateToken();
    return res.status(OK).json({ token });
  },
);

module.exports = router;
