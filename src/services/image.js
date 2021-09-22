const fs = require('fs');

const fileExists = (fileName) => {
  const files = fs.readdirSync(`${__dirname}/../uploads`);
  const fileFound = files.some((file) => file === `${fileName}.jpeg`);

  return fileFound;
};

const find = async (id) => {
  const file = fileExists(id);
  const path = `${__dirname}/../uploads/${id}.jpeg`;

  if (!file) return false;

  return path;
};

module.exports = { find };
