// const multer = require('multer');

// const upload = multer({ dest: '../sd-010-b-cookmaster/src/uploads/' });

// module.exports = upload;

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

// Lógica do multer baseada em Mari Mohr

module.exports = myMulter;
