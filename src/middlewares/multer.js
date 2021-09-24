const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: (req, file, callback) => {
        const { id } = req.params;
        callback(null, `${id}.jpeg`);
    },
});

const uploadMulter = multer({ storage });

module.exports = {
    uploadMulter,
};