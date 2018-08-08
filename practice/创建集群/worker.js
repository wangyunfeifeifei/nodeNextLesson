/**
 * 子进程
 * create by wangyunfeifeifei
 */

const http = require('http');

const server = http.createServer();

process.on('message', (m, handler) => {
    if (m === 'server') {
        handler.on('connection', (socket) => {
            // 这样就实现了集群监听统一端口
            server.emit('connection', socket);
        })
    }
});

server.on('request', (req, res) => {
    // 监听请求
    res.end(process.pid + "")
})
