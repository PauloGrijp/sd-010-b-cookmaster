const {
  modelUserReg,
} = require('../models/users');

const servUserReg = async (itens) => {
  console.log(itens, 'itens');
  return modelUserReg(itens);
};

module.exports = {
  servUserReg,
};