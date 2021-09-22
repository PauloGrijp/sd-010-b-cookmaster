const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: (req, _file, callback) => {
        const { id } = req.params;
        callback(null, `${id}.jpeg`);
    },
});

const myMulter = multer({ storage });

module.exports = { myMulter };