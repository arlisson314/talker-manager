const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^.*@.*\.com$/;
  try {
    if ([email].includes(undefined)) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(regex)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;
  try {
    if ([password].includes(undefined)) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (token.length !== 16) {
      return res.status(401).json({
          message: 'Token inválido',
      });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;
  try {
    if ([name].includes(undefined)) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

const validationAge = (req, res, next) => {
  const { age } = req.body;
  try {
    if ([age].includes(undefined)) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

const validationTalk = (req, res, next) => {
  const { talk } = req.body;
  try {
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

const validationTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  // verifica o formato da data
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!talk.watchedAt) {
    return res.status(400).json({
        message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!regex.test(talk.watchedAt)) {
    // !talk.watchedAt.match(regex)
    return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk.rate && talk.rate !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  validationEmail,
  validationPassword,
  validateToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkWatchedAt,
  validateTalkRate,
};