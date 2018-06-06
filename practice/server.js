const http = require('http');

const HOST = '127.0.0.1'
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
})

server.listen(PORT, HOST, () => {
    console.log(`server is start at http://${HOST}:${3000}`);
})
