const { generateToken } = require('./generateToken');
const { addNewTalker } = require('./addNewTalker');
const { getTalkers } = require('./getTalkers');
const { updateTalkers } = require('./updateTalkers');

module.exports = {
  generateToken,
  addNewTalker,
  getTalkers,
  updateTalkers,
};