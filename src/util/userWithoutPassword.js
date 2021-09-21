module.exports = (user) => {
  const { _id, name, email, role } = user;
  return { _id, name, email, role };
};
