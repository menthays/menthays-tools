const crypto = require('crypto');
const fs = require('fs');
const signale = require('signale')

/**
 * register this module
 * @param {*} program 
 */
const registerEncodeModule = program => {
  // register md5
  program
    .command('md5 <filepath>')
    .description('Get md5 for target file')
    .action(md5)
  
  program
    .command('base64 <filepath>')
    .description('Get base64 for target file')
    .action(base64)
}

/**
 * calc md5
 * @param {*} filepath 
 */
const md5 = filepath => {
  let md5sum = crypto.createHash('md5');
  let stream = fs.createReadStream(filepath);
  stream.on('data', chunk => {
    md5sum.update(chunk);
  });
  stream.on('end', _ => {
    let fileMd5 = md5sum.digest('hex');
    signale.complete(fileMd5)
  });
  stream.on('error', err => {
    signale.error(err)
  })
}

/**
 * calc bas64
 * @param {*} filepath 
 */
const base64 = filepath => {
  try {
    let rst = fs.readFileSync(filepath).toString('base64');
    signale.complete(rst)
  } catch(err) {
    signale.error(err)
  }
}

module.exports = {
  registerEncodeModule, md5, base64
}
