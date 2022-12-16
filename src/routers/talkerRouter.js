const { Router } = require('express');
const fs = require('fs').promises;
const { join } = require('path');

const router = Router();
const PATH = join(__dirname, '../talker.json');

router.get('/', async (_req, res) => {
  const fileContent = await fs.readFile(PATH, 'utf-8');
  const talkerList = JSON.parse(fileContent);
  return res.status(200).json(talkerList);
});

module.exports = router;
