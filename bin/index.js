#!/usr/bin/env node
const program = require('commander');

const readFileMd5 = require('../packages/readFileMd5')

// md5
program
  .command('md5 <dir>')
  .action(function (dir, cmd) {
    readFileMd5(dir)
      .then(console.log)
      .catch(console.error)
  })

program.parse(process.argv)