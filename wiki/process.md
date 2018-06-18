# node进程管理笔记
## 子进程

### cp.spawn方法
```javascript
const cp = require('child_process') 

let ls = cp.spawn('ping', ['www.baidu.com']); // 该函数会创建一个进程，第一个参数是命令， 第二个参数是该命令的参数列表

ls.stdout.on('data', (data) => {
    console.log('子进程返回的信息' + data)
})

ls.stderr.on('data', (data) => {
    console.log('子进程返回的错误' + data)
})

ls.on('close', (code) => {
    console.log('子进程的退出码' + code)
})
```

### cp.exec方法
```javascript
const cp = require('child_process')

cp.exec('ping www.baidu.com', (err, stdout, stderr) => {
    // 该回调函数会等待进程执行完成时才会执行
    if (err) {
        console.log(err)
        return
    }
    console.log(`输出${stdout}`)
    console.log(`错误${stderr}`)
})

```

### 创建node.js 子进程
```javascript
const cp = require('child_process')

cp.fork(`nodejs文件路径`) // 该方法会自动创建一个子进程并执行该文件

process.on('exit', () => {
    // 进程结束会触发进程exit事件
    console.log('进程退出')
}) 

```

## 进程间的消息通信
进程之间通过IPC传递消息，这个传递是双向的，类似于socket链接
```javascript
// parent.js
const cp = require('child_process')

let child = cp.fork(`nodejs文件路径`) // 该方法会自动创建一个子进程并执行该文件

child.send('Hello')
```

```javascript
// child.js
process.on('message', (msg) => {
    console.log(`收到来自父进程的消息:${msg}`)
})
```
