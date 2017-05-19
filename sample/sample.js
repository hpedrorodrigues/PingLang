import Ping from '../ping/compiler';
const fs = require('fs');

fs.readFile('./sample.ping', 'utf8', function (error, data) {
    if (error) {
        return console.log(error);
    }

    fs.writeFile("output.js", JSON.stringify(Ping.compile(data)), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log('Output saved!')
    })
});