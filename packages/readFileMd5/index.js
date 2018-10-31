const crypto = require('crypto')
const fs = require('fs')

const readFileMd5 = (url) => {
  return new Promise((reslove, reject) => {
    let md5sum = crypto.createHash('md5');
    let stream = fs.createReadStream(url);
    stream.on('data', chunk => {
      md5sum.update(chunk);
    });
    stream.on('end', _ => {
      let fileMd5 = md5sum.digest('hex');
      reslove(fileMd5);
    });
    stream.on('error', err => {
      reject(err)
    })
  })
}

module.exports = readFileMd5