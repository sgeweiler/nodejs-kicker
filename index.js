const os = require('os'); // Operating System: Develop Environment on WIN10, Execute on LINUX
const WIN = os.platform() === 'win32'
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let lastGoal = 0;
let goalCountOne = 0;
let goalCountTwo = 0;
const { exec } = require('child_process')

/* Einstellungen für die Spielzeit aus der Datenbank holen */
let playtime = 120;
let tournamentName = "Titel des Turniers";

let mysql = require('mysql');
const { compileTrust } = require("express/lib/utils");
const { Gpio } = require("onoff");

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kicker-ronny',
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connection to the database established")
})

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html')
});
app.get('/settings', function (req, res, next) {
  res.sendFile(__dirname + '/settings.html')
});

io.on('connect', function (client) {
  console.log('Client connected.')

  con.query("SELECT title FROM settings", function (err, result, fields) {
    if (err) throw err;
    // Nochmal überdenken ...
    let tournamentTitle = result[1].title;

    io.emit('initialCountdown', playtime, tournamentTitle);
  })

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

  client.on('start', () => {
    startGame();
  })

  client.on('settings', (setting) => {
    let values = [setting.name, setting.time, setting.mode];

    playtime = setting.time;
    tournamentName = setting.name;

    con.query("INSERT INTO settings (title, playtime, mode) VALUES (?, ?, ?);", values, function (err, result) {
      if (err) throw err;
      console.log('Einstellungen erfolgreich gesetzt');
    });
  })

  client.on('playerInput', (playerData) => {
    let values = [playerData.playerName, playerData.icon, playerData.color];

    con.query("INSERT INTO players (name, icon, color) VALUES (?, ?, ?);", values, function (err, result) {
      /* todo: Group ergänzen in der Datenbank */
      if (err) throw err;
      console.log('Spieler erfolgreich angelegt');
      io.emit('playerDataReceived', values);
    })
  })

  updateGoal();
  getDataFromDatabase();
});

server.listen(2301);

function updateGoal() {
  io.emit('goalCount', { goalCountOne, goalCountTwo });
  !WIN && exec(`python3 ../raspberrypi-python-tm1637/goal-count.py ${goalCountOne} ${goalCountTwo}`)

  /* Pfad muss auf den Ordner der TM1637 Bibliothek angepasst werden */
  /* !WIN && exec(`python3 ${__dirname}/goal-count.py ${goalCountOne} ${goalCountTwo}`) */
  /* ../raspberrypi-python-tm1637 */
}

function getDataFromDatabase() {
  con.query("SELECT * FROM players", function (err, result, fields) {

  })
}

function startGame() {
  io.emit('startGame');
  io.emit('countdown', playtime)

  let intervall = setInterval(function () {
    playtime--;
    io.emit('countdown', playtime)
    console.log(playtime);

    if (playtime === 10) {
      io.emit('tenSeconds')
    }

    if (playtime === 30) {
      io.emit('thirtySeconds')
    }

    if (playtime <= 0) {
      console.log("Spiel zu Ende");
      clearInterval(intervall);
    }
  }, 1000)
}

if (os.platform() === 'linux') {
  console.log('executing on raspberry')
  const Gpio = require('onoff').Gpio;
  const PhotoDiodeOne = new Gpio(21, 'in', 'both')
  const PhotoDiodeTwo = new Gpio(12, 'in', 'both')

  const CorrectButtonGreenOne = new Gpio(19, 'in', 'both')
  const CorrectButtonRedOne = new Gpio(17, 'in', 'both')

  const CorrectButtonGreenTwo = new Gpio(13, 'in', 'both')
  const CorrectButtonRedTwo = new Gpio(27, 'in', 'both')

  let ControlDate = null;

  PhotoDiodeOne.watch(function (err, value) {
    if (err)
      return console.error(err);
    if (value === 0 || Date.now() - 4000 < lastGoal)
      return
    lastGoal = Date.now()
    goalCountOne++
    updateGoal(goalCountOne);
    console.log(goalCountOne);
  });

  PhotoDiodeTwo.watch(function (err, value) {
    if (err)
      return console.error(err);
    if (value === 0 || Date.now() - 4000 < lastGoal)
      return
    lastGoal = Date.now()
    goalCountTwo++
    updateGoal(goalCountTwo);
    console.log(goalCountTwo);
  });

  CorrectButtonGreenOne.watch(function (err, value) {
    if (err)
      return console.error(err)

    if (value === 1)
      ControlDate = Date.now();

    if (value === 0 && ControlDate != null && ControlDate + 2000 < Date.now()) {
      ControlDate = null;
      goalCountOne++
      updateGoal(goalCountOne);
      console.log(goalCountOne);
    }
  });

  CorrectButtonGreenTwo.watch(function (err, value) {
    if (err)
      return console.error(err)

    if (value === 1)
      ControlDate = Date.now();

    if (value === 0 && ControlDate != null && ControlDate + 2000 < Date.now()) {
      ControlDate = null;
      goalCountTwo++
      updateGoal(goalCountTwo);
      console.log(goalCountTwo);
    }
  });

  CorrectButtonRedOne.watch(function (err, value) {
    if (err)
      return console.error(err)

    if (value === 1)
      ControlDate = Date.now();

    if (value === 0 && ControlDate != null && ControlDate + 2000 < Date.now()) {
      ControlDate = null;
      goalCountOne--
      updateGoal(goalCountOne);
      console.log(goalCountOne);
    }
  });

  CorrectButtonRedTwo.watch(function (err, value) {
    if (err)
      return console.error(err)

    if (value === 1)
      ControlDate = Date.now();

    if (value === 0 && ControlDate != null && ControlDate + 2000 < Date.now()) {
      ControlDate = null;
      goalCountTwo--
      updateGoal(goalCountTwo);
      console.log(goalCountTwo);
    }
  });


  function unexportOnClose() {
    PhotoDiodeOne.unexport();
    PhotoDiodeTwo.unexport();
  }

  process.on('SIGINT', unexportOnClose);
}