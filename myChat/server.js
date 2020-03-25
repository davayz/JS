// const ngrok = require('ngrok');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.engine('html', require('ejs').renderFile);

const dirname = 'C:/Users/Artem.Soldatenkov/myChat/src/';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.set('views', `${dirname}views`);

app.set('view engine', 'ejs');

function User(nickname) {
  this.nickname = nickname;
}

const users1 = [];
const users = new Map();

app.get('/', (req, res) => {
  res.render('Login.html');
});


app.get('/Main', (req, res) => {
  // const token = req.body.value;
  // console.log("MAIN");
  // console.log("MAIN "+token);
  /* if (users.get(token) === undefined) return; */
  console.log(req.session.userName);
  if (!req.session.userName) return;
  res.render('Index.html');
});

app.get('/Redirect', (req, res) => {
  res.send();
});

function generateToken() {
  return 'token';
}

app.post('/Login', (req, res) => {
  console.log('POST Login');
  const userName = req.body.value;
  console.log(userName);

  /* if (userName === '') {
    return;
  } */

  req.session.userName = userName;


  const user = new User(userName);
  users1.push(user);

  users.set(userName, user);
  console.log(users);
  console.log('***');

  console.log(users1);
});


io.on('connection', (socket) => {
  io.emit('chat message', 'user connected');
  socket.broadcast.emit('chat message', 'user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`message: ${msg}`);
  });
});

http.listen(80, () => {
  console.log(`listening on *:${80}`);
});


// (async function () {
//   const url = await ngrok.connect();
//   console.log(url);
// }());
