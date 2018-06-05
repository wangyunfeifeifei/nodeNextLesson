const http = require('http');
const querystring = require('querystring');
const url = require('url');

const Config = {
    host: '127.0.0.1',
    port: 3000
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    const o = url.parse(req.url).query || '';
    res.end(JSON.stringify(querystring.parse(o)));
});

server.listen(Config.port, Config.host, () => {
    console.log(`server is start at http://${Config.host}:${Config.port}`);
});