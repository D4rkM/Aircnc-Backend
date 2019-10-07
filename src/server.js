const express = require('express');
const routes  = require('./routes');
const mongoose  = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

io = socketio(server);

connectedUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

mongoose.connect("mongodb+srv://omnistack:omnistack@omnistack-p8chx.mongodb.net/semana09?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//REQUESTS => GET, POST, PUT, DELETE
// req, query = Acessar query params (filtro de pesquisas)
// req.params = Acessar route params (para edição, delete)
// req.body   = Acessar corpo da requisição (para criação, edição)
app.use(express.json());
app.use(cors());
app.use('/file', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

app.post('/users', (req, res) => {

    return res.json({idade: req.body })

});

server.listen(3333, () => {
    console.log('Server started at port 3333');
});