const os = require('os'); // Operating System: Develop Environment on WIN10, Execute on LINUX
const WIN = os.platform() === 'win32'

let goalCountOne = -1;
let goalCountTwo = -1;

const {exec} = require('child_process')

!WIN && exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${goalCountOne} ${goalCountTwo}`)