Microserviço de autenticação com Nodejs

Composição do nosso projeto
Neste Temos alguns Endpoints Base que podem ser projetos estendidos da forma mais adequados para seu contexto.

São eles:

Usuários
GET /usuários
GET /usuários/:uuid
POST /usuários
PUT /usuários/:uuid
DELETE /users/:uuid
Autenticação
POST/token
POST /token/validate
