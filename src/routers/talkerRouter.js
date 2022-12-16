const { Router } = require('express');
const fs = require('fs').promises;
const { join } = require('path');
const { OK, NOT_FOUND } = require('../constants/statusCode');

const router = Router();
const PATH = join(__dirname, '../talker.json');

router.get('/', async (_req, res) => {
  const fileContent = await fs.readFile(PATH, 'utf-8');
  const talkerList = JSON.parse(fileContent);
  return res.status(OK).json(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileContent = await fs.readFile(PATH, 'utf-8');

  const talkerList = JSON.parse(fileContent);
  const selectedTalker = talkerList.find((talker) => talker.id === Number(id));

  if (!selectedTalker) {
    const errorMessage = {
      message: 'Pessoa palestrante não encontrada',
    };

    return res.status(NOT_FOUND).json(errorMessage);
  }

  return res.status(OK).json(selectedTalker);
});

module.exports = router;
