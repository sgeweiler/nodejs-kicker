const {app, io} = require('./app.js');
const os = require('os'); // Operating System: Develop Environment on WIN10, Execute on LINUX
const Gpio = require('onoff').Gpio;
const MotionSensor = new Gpio(12, 'in', 'both');
const PhotoDiode = new Gpio(21, 'in', 'both')

let countBall = 0;
let countMotionOnDiode = 0;
let lastGoal = 0;

const { exec } = require('child_process')

if (os.platform() === 'linux'){
    MotionSensor.watch(function (err, value) {
        if (err)
            return console.error(err);
        if (value === 1)
            countBall++
        exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${countBall}`)
        console.log(value, countBall)
    });

    app.get('/test', (req, res) => {
        res.send(`${countBall}`)
    });

    PhotoDiode.watch(function (err, value) {
        if (err)
            return console.error(err);
        if (value === 0 || Date.now() - 4000 < lastGoal)
            return
        lastGoal = Date.now()
        countMotionOnDiode++
        exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${countMotionOnDiode}`)
        console.log(value, countMotionOnDiode)
    });


    function unexportOnClose() {
        MotionSensor.unexport();
    }

    process.on('SIGINT', unexportOnClose);
} else {
    console.log('Developing on win32');
}
