#!/usr/bin/env node
const chalk = require('chalk')
const program = require('commander');

const readFileMd5 = require('../packages/readFileMd5')
const {sshKeyGen, sshKeyGet} = require('../packages/ssh')
const {start} = require('../packages/redis')

program
  .version("0.0.1")
  .description("Encapsulation of common commands menthays used")


// md5
program
  .command('md5 <dir>')
  .description('Get md5 for target file')
  .action(function (dir, cmd) {
    readFileMd5(dir)
      .then(console.log)
      .catch(console.error)
  })

// ssh key
program
  .command('ssh-key gen')
  .description('Generate ssh key')
  .option('-C, --comment [comment]', 'usually your email')
  .option('-N, --password [password]', 'password', '')
  .option('-f, --location [location]', 'location', 'ssh_key')
  .action(function({ comment, password, location }) {
    sshKeyGen({
      comment,
      password,
      location
    })
  })

program
  .command('ssh-key get')
  .description('Get ssh key')
  .action(function(cmd) {
    sshKeyGet()
      .then(res => {console.log(chalk.yellowBright('\n'+res))})
      .catch(console.error)
  })

// start redis
program
  .command('redis serve')
  .description('start redis server')
  .action(function() {
    start()
  })

program.parse(process.argv)