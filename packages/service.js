const { exec } = require('child_process')
const signale = require('signale')

const registerServiceModule = program => {
  program
    .command('start <service>')
    .description('start typical servcie')
    .action((service) => {
      signale.info('Starting ', service)
      switch(service) {
        default:
          signale.error('no such service');
          break;
        case 'redis':
          startRedis();
          break;
      }
    })
    .on('--help', () => {
      signale.log('\n', '<service> can be: ', 'redis')
    })
}

const startRedis = () => {
  const path = '~/Development/redis/src/redis-server'
  let res = exec(path);

  res.stderr.on('data', (data) => {
    signale.error(`stderr: ${data}`);
  });

  res.stdout.on('data', (data) => {
    signale.log(`stdout: ${data}`);
  });
  
  res.on('close', (code) => {
    signale.log(`child process exited with code ${code}`);
  });
}

module.exports = {
  startRedis,
  registerServiceModule
}
