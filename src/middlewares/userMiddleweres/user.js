const mailFormat = /[a-z]+@[a-z]+.com/g;

const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !email.match(mailFormat)) {
 return res.status(400).json({
        message: 'Invalid entries. Try again.',
    }); 
}
next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
 return res.status(401).json({
        message: 'All fields must be filled',
    }); 
}
next();
};

module.exports = { validateUser, validateLogin };