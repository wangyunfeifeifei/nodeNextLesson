/**
 * 主进程
 * create by wangyunfeifeifei
 */

const net = require('net');
const cp = require('child_process');
const path = require('path');

const workers = [];

for (i=0; i<4; i++) {
    workers.push(cp.fork(path.join(__dirname, 'worker.js')));
}

const server = net.createServer({pauseOnConnect: true}); // 暂停链接相关的套接字，允许在进程之间传递

server.listen(3000);

server.on('connection', (socket) => {
    let worker = workers.shift(); 
    worker.send('socket', socket);
    workers.push(worker);
});
