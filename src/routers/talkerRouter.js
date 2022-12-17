const { Router } = require('express');
const { OK, NOT_FOUND, CREATED } = require('../constants/statusCode');
const { getTalkers } = require('../utils/fs/getTalkers');
const { validateToken } = require('../middleware/validateToken');
const { validateAge } = require('../middleware/validateAge');
const { validateName } = require('../middleware/validateName');
const { validateTalk } = require('../middleware/validateTalk');
const { validateDate } = require('../middleware/validateDate');
const { validateRate } = require('../middleware/validateRate');
const { addNewTalker } = require('../utils/fs/addNewTalker');

const router = Router();

router.get('/', async (_req, res) => {
  const talkerList = await getTalkers();
  return res.status(OK).json(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalkers();
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
  '/',
  validateToken,
  validateName,
  validateAge, 
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkerList = await getTalkers();
    const newTalkerId = talkerList[talkerList.length - 1].id + 1;

    const newTalker = {
      id: newTalkerId,
      name,
      age,
      talk,
    };

    await addNewTalker(newTalker);
    
    res.status(CREATED).json(newTalker);
  }
  ,
);

module.exports = router;
