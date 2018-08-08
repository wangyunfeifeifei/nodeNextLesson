const http = require('http');

const server = http.createServer();
server.listen(3000);
server.on('request', (req, res) => {
    if (Math.random()*1000 > 500) {
        throw new Error('模拟错误');
    }
    res.end(`worker[${process.pid}] handle request`);
});

process.on('uncaughtException', (err) => {
    console.log(err.message)
    process.send({act: 'suicide'}); // 向主进程发送自杀请求
    server.close(() => {
        // 当server关闭后关闭进程
        process.exit(1);
    });
    setTimeout(() => {
        // 超时后关闭
        process.exit(1);
    }, 10000);
})
