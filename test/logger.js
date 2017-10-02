const Fs = require('fs');
Fs.readFile('./private/log.txt', function (err, data) {
  console.log('error: ', err, '\nregular:');
  console.log(data.toString());
});