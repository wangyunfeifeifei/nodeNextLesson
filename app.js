const http = require('http');
const chalk = require('chalk');
const ejs = require('ejs');
const fs = require('fs');

const config = require('./config/config');
const { getQuery } = require('./util/util');

const renderFile = require('util').promisify(ejs.renderFile);

const server = http.createServer(async (req, res) => {
    res.StatusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    console.log(`${chalk.blue(req.method)}    ${req.url}`);
    
    //下面是处理页面
    const pageData = JSON.parse(fs.readFileSync('./mock/mock.json', 'utf-8'));

    let html;

    if(/\/blog\?/.test(req.url)) {
        let query = getQuery(req.url);
        let id = null;
        let data;
        if(query.id) {
            pageData.forEach(val => {
                if(parseInt(val.id) === parseInt(query.id)) {
                    id = parseInt(val.id);
                    data = val;
                }
            })
        }
        if (id || id === 0) {
            html = await renderFile('./view/detail.ejs',{
                title: data.title,
                detail: data.detail
            });
        } else {
            html = await renderFile('./view/404.ejs');
        }
    } else {
        html = await renderFile('./view/list.ejs', {
            data: pageData
        });
    }
    res.end(html);
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`server is start at ${chalk.green(`http://${config.HOST}:${config.PORT}`)}`)
})
