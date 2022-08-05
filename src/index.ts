import express from "express";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.routes";

const app = express();

//Configuração da aplicação
app.use(express.json())
app.use(express.urlencoded({extended: true})); //entender strings

//Configuração das Rotas

app.use(usersRoute);
app.use(statusRoute)

//Inicialização  do servidor
app.listen(3000, () => {
    console.log('Executando porta 3000')
})