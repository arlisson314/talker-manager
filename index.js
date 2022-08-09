const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers } = require('./services/fs_utils');
const { generateToken } = require('./validation/validationToken');
const { validationEmail, validationPassword } = require('./validation/validationLogin');

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

app.listen(PORT, () => {
  console.log('Online');
});

// const MIN_DIG = 6;
// const regex = /^.*@.*\.com$/;
// return (password.length >= MIN_DIG && email.match(regex)