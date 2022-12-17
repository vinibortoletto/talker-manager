const fs = require('fs').promises;
const { join } = require('path');
const { getTalkers } = require('./getTalkers');

const PATH = join(__dirname, '../../talker.json');

const addNewTalker = async (newTalker) => {
  const talkerList = await getTalkers();
  await fs.writeFile(PATH, JSON.stringify([...talkerList, newTalker]));
};

module.exports = { addNewTalker };
