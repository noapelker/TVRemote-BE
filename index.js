const express = require('express');
const server = express();

const adb = require('adbkit');
const client = adb.createClient({host: '127.0.0.1', port: 5037});
const port = 3030;
const command = {
    up: 19,
    down: 20,
    right: 22,
    left: 21,
    plus: 24,
    minus: 25,
    menu: 3,
    center: 23,
    power: 26,
    back: 4
};

const streamer = '192.168.86.29:5037';

const apps = {
    netflix: 'com.netflix.ninja',
    sting: 'il.co.stingtv.atv'
};

const sendCommand = async number => {
    if (!number)
        return;
    client.shell(streamer, 'input keyevent ' + number)

};

const startApp = async appPackage => {
    if (!appPackage)
        return;
    client.shell(streamer, ['monkey', '-p', appPackage, '-c', 'android.intent.category.LAUNCHER', 1])
};

const search = async text => {
    if (!text)
        return;
    client.shell(streamer, 'input keyevent ' + 28);
};


server.get('/', (req, res) => {
    res.send('none');
});
server.get('/command', (req, res) => {
    sendCommand(command[req.query.dir]).then()
    res.send('COMMAND');
});
server.get('/app', (req, res) => {
    startApp(apps[req.query.name]).then()
    res.send('APP');
});
server.get('/search', (req, res) => {
    search(req.query.text).then();
    res.send(req.query.text);
});
server.listen(port);
