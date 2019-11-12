const http = require('http');
const fs = require('fs');

fs.readFile('./index.html', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  if (data) {
    const server = http.createServer((req, res) => {
      res.end(data);
    });
    const io = require('socket.io')(server);
    let messages = [];
    io.on('connection', iencli => {
      iencli.on('firstLoad', () => iencli.emit('message', messages));
      iencli.on('messageSend', data => {
        let d = new Date();
        messages.push(d.getHours()+":"+d.getMinutes()+" ==== "+data);
        io.emit('message', messages)
      });
    });
    server.listen(3000);
  }
});
