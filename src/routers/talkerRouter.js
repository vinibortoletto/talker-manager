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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileContent = await fs.readFile(PATH, 'utf-8');

  const talkerList = JSON.parse(fileContent);
  const selectedTalker = talkerList.find((talker) => talker.id === Number(id));

  if (!selectedTalker) {
    const errorMessage = {
      message: 'Pessoa palestrante não encontrada',
    };

    return res.status(404).json(errorMessage);
  }

  return res.status(200).json(selectedTalker);
});

module.exports = router;
