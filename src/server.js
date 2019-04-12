//importar a biblioteca express - acessar a dependêcia
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();

//Todo mundo pode acessar a aplicação - tem como restringir
app.use(cors());

//protocolo web socket
// importar o socket - receber aquisições socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

//representação da coneção do usuario real time na sala correta para cada usuário
io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect(
"mongodb+srv://ebv:Krdm0825@cluster0-cjjzc.mongodb.net/ebv?retryWrites=true",
{
    useNewUrlParser: true
}
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

//cadastrar um modulo dentro do express
//esse modulo(tambem é um midwere) ajuda a entender as requisições em formato json
//receber e retornar dados para o front-end usa o json
app.use(express.json());
//envio arquivos
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")))
//declarando o routes
app.use(require("./routes"));

server.listen(process.env.PORT || 3333);


