module.exports = (user) => {
  const { _id, name, email, role } = user;
  return { user: { _id, name, email, role } };
};
