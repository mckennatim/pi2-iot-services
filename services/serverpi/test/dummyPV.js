const http = require('http');

var options = {
  hostname: 'parleyvale.com',
  port: 80,
  path: '/',
  method: 'GET'
};

var req = http.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();