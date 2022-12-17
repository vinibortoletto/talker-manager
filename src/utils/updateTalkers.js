const fs = require('fs').promises;
const { join } = require('path');

const PATH = join(__dirname, '../talker.json');

const updateTalkers = async (newTalkerList) => {
  await fs.writeFile(PATH, JSON.stringify([...newTalkerList]));
};

module.exports = { updateTalkers };
