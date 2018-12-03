#!/usr/bin/env node
const chalk = require('chalk')
const program = require('commander');

const {registerEncodeModule} = require('../packages/encode');
const {registerSSHModule} = require('../packages/ssh');
const {registerServiceModule} = require('../packages/service')

program
  .version("0.0.1")
  .description("Encapsulation of common commands menthays used")

registerEncodeModule(program);
registerSSHModule(program);
registerServiceModule(program);

program
  .command('*')
  .action(() => {
    program.help();
  });

program.parse(process.argv);

if(!program.args.length) {
  program.help();
}