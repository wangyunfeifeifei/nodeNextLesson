/**
 * cluster模块的应用
 * create by wangyunfeifeifei
 */

const cluster = require('cluster');
const http = require('http');

// cpu数量，充分利用多核CPU
const cpuNum = 4;

if (cluster.isMaster) {
    // 如果是主进程走这个分支
    cluster.schedulingPolicy = cluster.SCHED_RR; // Unix系统不用设置这一条，Windows环境默认采用抢占式，设置后变为轮叫调度
    for(let i=0; i<cpuNum;i++) {
        // cluster创建的子进程依然后执行该文件代码
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        console.info('wocker exit');
    })
} else {
    // 如果是工作进程走这个分之
    let server = http.createServer();
    server.listen(3000);
    server.on('request', (req, res) => {
        res.end(`worker[${process.pid}] handle request`);
    })
}