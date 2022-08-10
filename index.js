const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, setWritetalkers } = require('./services/fs_utils');
const { generateToken } = require('./services/token');
const {
  validationEmail,
  validationPassword,
  validateToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkWatchedAt,
  validateTalkRate } = require('./validation/validations');
// const { autthMiddleware } = require('./services/authMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(500).json([]);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await getTalkers();
    const filterTalkerById = talkers.find((f) => f.id === Number(id));
    if (!filterTalkerById) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    return res.status(HTTP_OK_STATUS).json(filterTalkerById);
  } catch (error) {
    return res.status(500).end();
  }
});

app.post('/login', validationEmail, validationPassword, (req, res) => {
  const { email, password } = req.body;
  const token = generateToken();

  try {
    if ([email, password].includes(undefined)) {
      return res.status(400).json({ message: 'missing fields' });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.end(500).end();
  }
});

app.post('/talker',
// autthMiddleware,
validationName,
validateToken,
validationAge,
validationTalk,
validationTalkWatchedAt,
validateTalkRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await getTalkers();
  const id = talkers.length + 1;
  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.push(newTalker);
  await setWritetalkers(talkers);

  return res.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

// const MIN_DIG = 6;
// const regex = /^.*@.*\.com$/;
// return (password.length >= MIN_DIG && email.match(regex)