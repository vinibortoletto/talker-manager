const { Router } = require('express');
const { generateToken } = require('../utils/generateToken');
const { OK } = require('../constants/statusCode');
const { validateEmail } = require('../middleware/validateEmail');

const router = Router();

router.post('/', validateEmail, async (req, res) => {
  const token = generateToken();
  return res.status(OK).json({ token });
});

module.exports = router;
