const userModel = require('../models/userModel');

// req 1
// Verfica que o campo name é obrigatório
const nameValidation = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

// req 1
// Verifica que o campo email é obrigatório
// Regex gerado em https://regex-generator.olafneumann.org/?sampleText=exemplo%40trybe.com&flags=i&onlyPatterns=false&matchWholeLine=false&selection=0%7CMultiple%20characters,7%7CCharacter,8%7CMultiple%20characters,13%7CCharacter,14%7CMultiple%20characters
const emailValidation = (email) => {
  const regexEmail = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/;
  if (!email || !regexEmail.test(email)) {
    return false;
  }
  return true;
};

// req 1
// Verifica se o usuario é válido, se foi criado com sucesso ou se já existe.
const userCreateValidation = async ({ name, email, password, role }) => {
  const validatedName = nameValidation(name);
  const validatedEmail = emailValidation(email);

  const validatedExistsEmail = await userModel.findUserByEmail(email);
  if (!validatedName) {
    return { message: 'Invalid entries. Try again.' };
  }

  if (!validatedEmail) {
    return { message: 'Invalid entries. Try again.' };
  }

  if (validatedExistsEmail) {
    return { message: 'Email already registered' };
  }

  const { id } = await userModel.userCreate({ name, email, password, role });
  return { id, name, password, role };
};

module.exports = {
  userCreateValidation,
}; 
