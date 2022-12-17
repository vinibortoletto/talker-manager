const fs = require('fs').promises;
const { join } = require('path');

const PATH = join(__dirname, '../../talker.json');

const readTalkerFile = async () => {
  const fileContent = await fs.readFile(PATH, 'utf-8');
  return JSON.parse(fileContent);
};

module.exports = { readTalkerFile };
