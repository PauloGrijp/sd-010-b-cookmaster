const login = (_req, res) => {
  try {
    return res.status(200).json({ message: 'Controller!' });
  } catch (error) {
    return res.status(500).json({ message: 'Controller error' });
  }
};

module.exports = {
  login,
};
