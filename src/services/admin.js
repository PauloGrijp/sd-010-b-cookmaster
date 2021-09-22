const Models = require('../models');

const find = async (id) => {
  const search = await Models.user.findById(id);
  
  if (!search || search.role !== 'admin') return false;
  
  return (search);
};

module.exports = { find };
