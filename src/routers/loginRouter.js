const { Router } = require('express');
const { generateToken } = require('../utils/generateToken');
const { OK } = require('../constants/statusCode');
const { validateEmail } = require('../middleware/validateEmail');
const { validatePassword } = require('../middleware/validatePassword');

const router = Router();

router.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  return res.status(OK).json({ token });
});

module.exports = router;
