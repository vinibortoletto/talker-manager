const { Router } = require('express');
const {
  OK,
  NOT_FOUND,
  CREATED,
  NO_CONTENT,
} = require('../constants/statusCode');

const middleware = require('../middleware');
const { getTalkers, addNewTalker, updateTalkers } = require('../utils');

const router = Router();

router.get('/search', middleware.validateToken, async (req, res) => {
  const { q: searchedName } = req.query;
  const talkerList = await getTalkers();
  const filteredTalkerList = talkerList.filter((talker) =>
    talker.name.includes(searchedName));

  if (!searchedName || searchedName.length === 0) {
    return res.status(OK).json(talkerList);
  }

  return res.status(OK).json(filteredTalkerList);
});

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
  middleware.validateToken,
  middleware.validateName,
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateDate,
  middleware.validateRate,
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
  },
);

router.put(
  '/:id',
  middleware.validateToken,
  middleware.validateName,
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateDate,
  middleware.validateRate,
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
  },
);

router.delete('/:id', middleware.validateToken, async (req, res) => {
  const { id } = req.params;
  const talkerList = await getTalkers();
  const newTalkerList = talkerList.filter((talker) => talker.id !== Number(id));

  await updateTalkers(newTalkerList);

  return res.status(NO_CONTENT).end();
});

module.exports = router;
