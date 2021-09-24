## Projeto desenvolvido durante o curos de desenvolvimento web da Trybe.

## Resumo da aplicação:
Basicamente se trata de um CRUD em mongo, nodejs express para registro de receitas. Nessa aplicação é possível:
* Realizar um cadastro de usuário;
* Fazer login, tendo como retorno um token de autenticação JWT;
* Criar uma receita caso esteja na posso do token gerado no login e ele seja válido;
* Listar todas as receitas salvas no banco de dados;
* Listar uma receita específica a partir do ID;
* Criar um usuário com permissṍes de 'admin';
* Edição de receitas;
* Exclusão de receitas;
* Adição de uma imagem à receita;
* Testes de integração;

Técnologias utilizadas:
  * Padrão: MSC;
  * Aplicação: MongoDB, NodeJS, Express, Autenticação com JWT e Multer;
  * Testes de integração: Mocha, chai, sinon e mongo-memory-server

## OBS: testes ainda em desenvolvimento;
