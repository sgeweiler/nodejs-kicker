const os = require('os'); // Operating System: Develop Environment on WIN10, Execute on LINUX
const WIN = os.platform() === 'win32'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let lastGoal = 0;

let goalCountOne = 0;
let goalCountTwo = 0;

const {exec} = require('child_process')

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html')
});

io.on('connect', function (client) {
    console.log('Client connected...')

    client.on('correctionOne', (amount) => {
        goalCountOne += amount;
        updateGoal();
    });

    client.on('correctionTwo', (amount) => {
        goalCountTwo += amount;
        updateGoal();
    });

    client.on('reset', () => {
        goalCountOne = 0;
        goalCountTwo = 0;
        updateGoal();
    });

    updateGoal();
});

server.listen(2301);

function updateGoal() {
    io.emit('goalCount', {goalCountOne, goalCountTwo});
    /* Pfad muss auf den Ordner der TM1637 Bibliothek angepasst werden */
    !WIN && exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${goalCountOne} ${goalCountTwo}`)
    /* !WIN && exec(`python3 ${__dirname}/goal-count.py ${goalCountOne} ${goalCountTwo}`) */
    /* ../raspberrypi-python-tm1637 */
}

if (os.platform() === 'linux') {
    console.log('executing on raspberry')
    const Gpio = require('onoff').Gpio;
    const PhotoDiodeOne = new Gpio(21, 'in', 'both')
    const PhotoDiodeTwo = new Gpio(12, 'in', 'both')

    PhotoDiodeOne.watch(function (err, value) {
        if (err)
            return console.error(err);
        if (value === 0 || Date.now() - 4000 < lastGoal)
            return
        lastGoal = Date.now()
        goalCountOne++
        updateGoal(goalCountOne);
    });

    PhotoDiodeTwo.watch(function (err, value) {
        if (err)
            return console.error(err);
        if (value === 0 || Date.now() - 4000 < lastGoal)
            return
        lastGoal = Date.now()
        goalCountTwo++
        updateGoal(goalCountTwo);
    });

    function unexportOnClose() {
        PhotoDiodeOne.unexport();
        PhotoDiodeTwo.unexport();
    }

    process.on('SIGINT', unexportOnClose);
}