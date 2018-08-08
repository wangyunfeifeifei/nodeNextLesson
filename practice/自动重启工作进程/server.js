const cluster = require('cluster');

const cpuNum = 4;

if (cluster.isMaster) {
    let workers = {};
    for(let i=0;i<cpuNum;i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        console.log('worker exit');
    });
    cluster.on('fork', (worker) => {
        workers[worker.process.pid] = worker;
        worker.on('message', (info) => {
            if (info.act === 'suicide') {
                console.log('worker suicide');
                // 工作进程死了，重新创建工作进程
                cluster.fork();
                console.log('worker generate')
            }
        })
    })
} else {
    require('./worker.js');
}
