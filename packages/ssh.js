const {
  exec
} = require('child_process')
const fs = require('fs')
const signale = require('signale')

const registerSSHModule = program => {
  program
    .command('ssh-keygen')
    .description('Generate ssh key')
    .option('-C, --comment [comment]', 'usually your email')
    .option('-N, --password [password]', 'password')
    .option('-f, --location [location]', 'location')
    .action(sshKeyGen)

  program
    .command('ssh-keyget')
    .description('Get ssh key')
    .action(sshKeyGet)

  program
    .command('ssh-alias')
    .description('show ssh alias')
    .action(sshAlias)
}

const sshKeyGen = ({
  comment,
  password='',
  location=`${process.env.HOME}/.ssh/id_rsa`
}) => {
  console.log(comment, password, location)
  let gen = exec('ssh-keygen', [
    '-t', 'rsa',
    '-C', '',
    '-N', '',
    '-f', 'rsa'
  ])

  gen.stderr.on('data', (data) => {
    signale.error(`stderr: ${data}`);
  });

  gen.stdout.on('data', (data) => {
    signale.log(`stdout: ${data}`);
  });

  gen.on('close', (code) => {
    signale.log(`child process exited with code ${code}`);
  });
}

const sshKeyGet = () => {
  const filepath = `${process.env.HOME}/.ssh/id_rsa.pub`
  let stream = fs.createReadStream(filepath);
  let string = '';

  stream.on('error', data => {
    signale.error(`stderr: ${data}`);
  })
  stream.on('data', data => {
    string += data
  })
  stream.on('end', _ => {
    signale.complete(string)
  })
}

const sshAlias = () => {
  const filepath = `${process.env.HOME}/.ssh/config`
  const sample = `Host your_alias_name
    User username
    Hostname remote.sshserver.com
    Port 50001`;

  fs.writeFile(filepath, sample, {
    flag: 'w'
  }, err => {
    err && signale.error(err)
    fs.readFile(filepath, 'utf-8', (err, data) => {
      err && signale.error(err);
      signale.log('At', filepath, '\n');
      signale.log(data);
    });
  });
}

module.exports = {
  sshKeyGen,
  sshKeyGet,
  sshAlias,
  registerSSHModule,
}