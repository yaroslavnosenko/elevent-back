const express = require('express');

const app = express();

require('./startup/routes')(app);

const server = app.listen(8080);

const io = require('socket.io')(server);

const messages = [];

app.get('/messages', async (req, res) => {
    return res.send(messages);
});

io.on('connection', (socket) => {

    socket.on('new-message', (message) => {
        messages.push(message);
    });

    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

