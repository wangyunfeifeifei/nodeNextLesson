const http = require('http');

const server = http.createServer();

process.on('message', (m, socket) => {
    if (m === 'socket' && socket) {
        server.emit('connection', socket);
    }
});

server.on('request', (req, res) => {
    res.end(process.pid + '');
})
