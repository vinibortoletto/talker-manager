const fs = require('fs').promises;
const { join } = require('path');
const { readTalkerFile } = require('./readTalkerFile');

const PATH = join(__dirname, '../../talker.json');

const writeTalkerFile = async (newTalker) => {
  const talkerList = await readTalkerFile();
  await fs.writeFile(PATH, JSON.stringify([...talkerList, newTalker]));
};

module.exports = { writeTalkerFile };
