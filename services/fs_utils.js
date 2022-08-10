const { readFile, writeFile } = require('fs').promises;

// const getTalkers = async () => readFile('/talker.json', 'utf-8')
//   .then((data) => JSON.parse(data));

const getTalkers = async () => {
  const talkers = await readFile('./talker.json');
  const parsedTalkers = JSON.parse(talkers);
  return parsedTalkers;
};

const setWritetalkers = (newSimpsons) => writeFile('./talker.json', JSON.stringify(newSimpsons));

module.exports = { getTalkers, setWritetalkers };