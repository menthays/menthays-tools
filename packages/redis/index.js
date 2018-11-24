const { exec } = require('child_process')

const path = '~/Development/redis/src/redis-server'

const start = () => {
  let res = exec(path);
  res.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  res.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  res.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = {
  start
}
