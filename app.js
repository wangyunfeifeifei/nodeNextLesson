const http = require('http');
const chalk = require('chalk');
const { handleview } = require('./router/view');
const { handleapi } = require('./router/api');

const config = require('./config');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const URL = req.url;
    const METHOD = req.method;

    console.log(`${chalk.blue(METHOD)}    ${URL}`);

    res.write(`<meta charset='utf-8'>`);
    
    if (URL.match(/\/api(\/|$)/)) {
        handleapi(req, res);
    } else if(URL.match(/\/view(\/|$)/)) {
        handleview(req, res);
    }else {
        res.end('Hello');
    }
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`server is start at ${chalk.green(`http://${config.HOST}:${config.PORT}`)}`);
});
