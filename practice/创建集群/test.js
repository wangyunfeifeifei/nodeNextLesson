const cp = require('child_process');

const m = {};
let count = 0;

for (let i = 0; i < 100; i++) {
    cp.exec('curl http://localhost:3000', (err, stdout, stderr) => {
        console.log(stdout);
        m[stdout] ? m[stdout] ++ : m[stdout] = 1;
        count ++;
        if(count === 100) {
            console.log(m);
        }
    })
}

