let goalCountOne = -1;
let goalCountTwo = -1;

const {exec} = require('child_process')

!WIN && exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${goalCountOne} ${goalCountTwo}`)