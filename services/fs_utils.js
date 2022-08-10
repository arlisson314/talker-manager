const { readFile, writeFile } = require('fs').promises;

const getTalkers = async () => {
  const talkers = await readFile('./talker.json');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
};

const setWritetalkers = (data) => writeFile('./talker.json', JSON.stringify(data));

module.exports = { getTalkers, setWritetalkers };