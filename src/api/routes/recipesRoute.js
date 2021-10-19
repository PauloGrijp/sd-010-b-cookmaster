const express = require('express');
const multer = require('multer');
const {
    createRecipe,
    getAllRecipes,
    findRecipeById,
    editRecipe,
    removeRecipe,
    addImage,
} = require('../controllers/recipesController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'src/uploads/');
    },
    filename: (req, _file, callback) => {
        const { id } = req.params;
        callback(null, `${id}.jpeg`);
    },
});

const upload = multer({ storage });

router.route('/')
    .post(
        validateJWT,
        createRecipe,
    )
    .get(
        getAllRecipes,
    );

router.route('/:id')
    .get(findRecipeById)
    .put(
        validateJWT,
        editRecipe,
    )
    .delete(
        validateJWT,
        removeRecipe,
    );
router.route('/:id/image')
    .put(
        validateJWT,
        upload.single('image'),
        addImage,
    );

module.exports = router;
