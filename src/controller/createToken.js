const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const createToken = () =>{
    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
    const token = jwt.sign({ data: user }, secret, jwtConfig);
}

module.exports = createToken