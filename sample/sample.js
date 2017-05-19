import Ping from '../ping/compiler';
const fs = require('fs');

fs.readFile('./sample.ping', 'utf8', function (error, data) {
    if (error) {
        return console.log(error);
    }

    console.log(Ping.compile(data));
});