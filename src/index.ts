import express from "express";
import bearerAthenticationMiddleware from "./middlewares/bearer-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.routes";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.routes";

const app = express();

//Configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({extended: true})); //entender strings

//Configuração das Rotas

app.use(bearerAthenticationMiddleware ,usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

//Inicialização  do servidor
app.listen(3000, () => {
    console.log('Executando porta 3000')
})