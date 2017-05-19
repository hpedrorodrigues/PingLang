import Ping from '../ping/compiler';
const fs = require('fs');

fs.readFile('./sample.ping', 'utf8', function (error, data) {
    if (error) {
        return console.log(error);
    }

    let dirname = './result';
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }

    fs.writeFileSync('result/result.js', Ping.compile(data));
});