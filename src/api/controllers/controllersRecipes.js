const services = require('../services/servicesRecipes');
const upload = require('../middlewares/upload');

const create = async (req, res) => services.create(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const getAll = async (_req, res) => services.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = async (req, res) => services.getById(req.params)
  .then(({ status, data }) => res.status(status).json(data));

const updateById = async (req, res) => services.updateById(req.params, req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json(recipe));

const deleteById = async (req, res) => services.deleteById(req.params)
  .then(({ status }) => res.status(status).json());

const putImage = [upload.single('image'),
  (req, res) => services.putImage(req.params.id, req.file.path)
    .then(({ status, data }) => res.status(status).json(data))];

module.exports = { create, getAll, getById, updateById, deleteById, putImage };
