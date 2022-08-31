import express from "express";
import bearerAthenticationMiddleware from "./middlewares/jwt-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.routes";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.routes";
import wjtAthenticationMiddleware from "./middlewares/jwt-authentication.middleware";

const app = express();

//Configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({extended: true})); //entender strings

//Configuração das Rotas

app.use(statusRoute);
app.use(authorizationRoute);

app.use(wjtAthenticationMiddleware);
app.use(usersRoute);


//Configuração dos Handlers de Erro
app.use(errorHandler);

//Inicialização  do servidor
app.listen(3000, () => {
    console.log('Executando porta 3000')
})