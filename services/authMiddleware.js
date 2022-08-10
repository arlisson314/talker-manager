const autthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token invalido' });
    }

    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = { autthMiddleware };