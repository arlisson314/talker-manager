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
  const MIN_DIG = 6;
  try {
    if ([password].includes(undefined)) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < MIN_DIG) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = {
  validationEmail,
  validationPassword,
};
