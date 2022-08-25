Neste projeto criei um microserviço de autenticação que poderá compor a sua caixinha de ferramentas e ser muito útil no seu dia a dia.

No projeto temos alguns Endpoints Base que podem ser extendidos da forma mais adequada para seu contexto.

São eles:

Usuários
GET /users
GET /users/:uuid
POST /users
PUT /users/:uuid
DELETE /users/:uuid
Autenticação
POST /token
POST /token/validate
