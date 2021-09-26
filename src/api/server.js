const app = require('./app');

const PORT = 3000;

// app.use((err, req, res, _next) => 
// res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`)); 

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
