const http = require('http');
const url = require('url');
const chalk = require('chalk');

const config = require('./config/config');
const BlogController = require('./controller/blog')

const blogController = new BlogController();

const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader('Content-Type', 'application/json');

    const URL = req.url;
    const METHOD = req.method;
    const parse = url.parse(req.url);

    console.log(`${chalk.blue(METHOD)}    ${URL}`);

    if (/^\/api\/blog/.test(parse.pathname)) {
        if (METHOD === 'GET') {
            blogController.doGET(req, res);
        } else if (METHOD === 'POST') {
            blogController.doPOST(req, res);
        }
    } else {
        res.end(JSON.stringify(config.failData));
    }
});

server.listen(config.port, config.host, () => {
    console.log(`server is start at ${chalk.green(`http://${config.host}:${config.port}`)}`)
});