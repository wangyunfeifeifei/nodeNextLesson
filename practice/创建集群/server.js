/**
 * 主进程
 * create by wangyunfeifeifei
 */

const http = require('http');
const cp = require('child_process');
const path = require('path');

let workers = [];

for (let i = 0; i< 4; i++) {
    // 创建4个进程
    workers.push(cp.fork(path.join(__dirname, 'worker.js')));
}

let server = http.createServer();

server.listen(3000, () => {
    workers.forEach((worker) => {
        worker.send('server', server);
    });
    server.close();
});
