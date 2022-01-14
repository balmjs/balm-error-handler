const { spawn } = require('child_process');

function serve() {
  const server = spawn('node', ['test/server.js']);

  server.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = serve;
