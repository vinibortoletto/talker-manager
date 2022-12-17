const { Router } = require('express');
const { OK, NOT_FOUND, CREATED, NO_CONTENT } = require('../constants/statusCode');
const { getTalkers } = require('../utils/fs/getTalkers');
const { validateToken } = require('../middleware/validateToken');
const { validateAge } = require('../middleware/validateAge');
const { validateName } = require('../middleware/validateName');
const { validateTalk } = require('../middleware/validateTalk');
const { validateDate } = require('../middleware/validateDate');
const { validateRate } = require('../middleware/validateRate');
const { addNewTalker } = require('../utils/fs/addNewTalker');
const { updateTalkers } = require('../utils/fs/updateTalkers');

const router = Router();

router.get('/', async (_req, res) => {
  const talkerList = await getTalkers();
  return res.status(OK).json(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalkers();
  const updatedTalker = talkerList.find((talker) => talker.id === Number(id));

  if (!updatedTalker) {
    const errorMessage = {
      message: 'Pessoa palestrante não encontrada',
    };

    return res.status(NOT_FOUND).json(errorMessage);
  }

  return res.status(OK).json(updatedTalker);
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

router.put('/:id', 
  validateToken,
  validateName,
  validateAge, 
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkerList = await getTalkers();
    const updatedTalker = talkerList.find((talker) => talker.id === Number(id));

    updatedTalker.name = name;
    updatedTalker.age = age;
    updatedTalker.talk = { ...talk };

    await updateTalkers([...talkerList, updatedTalker]);
    res.status(OK).json(updatedTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalkers();
  const newTalkerList = talkerList.filter((talker) => talker.id !== Number(id));

  await updateTalkers(newTalkerList);

  return res.status(NO_CONTENT).end();
});

module.exports = router;
