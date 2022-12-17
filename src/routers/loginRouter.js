const { Router } = require('express');
const { generateToken } = require('../utils/generateToken');
const { OK } = require('../constants/statusCode');

const router = Router();

router.post('/', async (req, res) => {
  const token = generateToken();
  return res.status(OK).json({ token });
});

module.exports = router;
