module.exports = (io) => {

    connectedUsers = {};

    io.on('connection', socket => {

        const { user_id } = socket.handshake.query;

        connectedUsers[user_id] = socket.id;
    });

}