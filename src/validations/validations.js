const validEmail = (email) => {
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    return emailRegex.test(email);
};
const allInfos = (user) => {
    const { name, password, email } = user;
    if (!name || !password || !email) return false;
    return true;
};

module.exports = { validEmail, allInfos };