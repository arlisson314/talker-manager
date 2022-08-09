const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers } = require('./fs_utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const talkers = await getTalkers();
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return res.status(500).json([]);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
