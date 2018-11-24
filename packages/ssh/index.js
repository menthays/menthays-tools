const { exec } = require('child_process')
const fs = require('fs')

const sshKeyGen = opts => {
  let gen = exec('ssh-keygen', [
		'-t','rsa',
		'-C', opts.comment,
		'-N', opts.password,
		'-f', opts.location
	])

  gen.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  gen.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  gen.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

const sshKeyGet = _ => {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(`${process.env.HOME}/.ssh/id_rsa.pub`)
    let string = ''
    stream.on('error', reject)
    stream.on('data', data => {
      string += data
    })
    stream.on('end', _ => resolve(string))
  })
}

module.exports = {
  sshKeyGen, sshKeyGet
}