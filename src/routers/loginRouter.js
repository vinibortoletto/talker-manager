const { Router } = require('express');
const { generateToken } = require('../utils/generateToken');
const { OK } = require('../constants/statusCode');
const middleware = require('../middleware');

const router = Router();

router.post(
  '/',
  middleware.validateEmail,
  middleware.validatePassword,
  async (_req, res) => {
    const token = generateToken();
    return res.status(OK).json({ token });
  },
);

module.exports = router;
