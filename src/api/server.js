const bodyParser = require('body-parser');
const app = require('./app');
const { createUser } = require('../controllers/userController');
const { createRecipe, getAllRecipes, getRecipe } = require('../controllers/recipeCrontroller');
const { login } = require('../controllers/login');
const { validateToken } = require('../middlewares/validateToken');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.use(bodyParser.json());

app.post('/users', createUser);
app.post('/login', login);
app.post('/recipes', validateToken, createRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipe);