const fs = require('fs');

const fileExists = (fileName) => {
  // fs.readdirSync retorna uma lista com nome de todos os arquivos da pasta uploads.
  const files = fs.readdirSync(`${__dirname}/../uploads`);
  // Aqui usamos a função some, que retorna `true` se algum dos items do array passar no teste, no nosso caso o `file.includes`.
  return files.some((file) => file === `${fileName}.jpeg`);
};

const find = async (id) => {
  const file = fileExists(id);
  if (!file) return false;
  
  const path = `${__dirname}/../uploads/${id}.jpeg`;

  return path;
};

module.exports = { find };
