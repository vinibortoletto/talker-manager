const { Router } = require('express');
const { OK, NOT_FOUND, CREATED } = require('../constants/statusCode');
const { readTalkerFile } = require('../utils/fs/readTalkerFile');
const { validateToken } = require('../middleware/validateToken');
const { validateAge } = require('../middleware/validateAge');
const { validateName } = require('../middleware/validateName');

const router = Router();

router.get('/', async (_req, res) => {
  const talkerList = await readTalkerFile();
  return res.status(OK).json(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await readTalkerFile();
  const selectedTalker = talkerList.find((talker) => talker.id === Number(id));

  if (!selectedTalker) {
    const errorMessage = {
      message: 'Pessoa palestrante não encontrada',
    };

    return res.status(NOT_FOUND).json(errorMessage);
  }

  return res.status(OK).json(selectedTalker);
});

router.post(
  '/:id',
  validateToken,
  validateName,
  validateAge, 
  (_req, res) => res.status(CREATED).json({}),
);

module.exports = router;
