#!/usr/bin/env node
const chalk = require('chalk')
const program = require('commander');

const readFileMd5 = require('../packages/readFileMd5')
const {sshKeyGen, sshKeyGet} = require('../packages/sshKey')

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
  .command('ssh-keygen')
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
  .command('ssh-keyget')
  .description('Get ssh key')
  .action(function(cmd) {
    sshKeyGet()
      .then(res => {console.log(chalk.yellowBright('\n'+res))})
      .catch(console.error)
  })

program.parse(process.argv)