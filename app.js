const express = require("express");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const logger = require("morgan");
require('./authentication/passport');
require('dotenv').config();
 
const auth = require('./middlewares/auth.middleware');
const teacherRouter = require('./routers/teachers.router');
const subjectRouter = require('./routers/subject.router');
const usersRouter = require('./routers/users.router');
const timeSlotRouter = require('./routers/timeSlot.router');
const db = require("./utils/db");

const PORT = process.env.PORT || 3000;

const server = express();

// server.use(logger("dev"));

server.use(express.json());
server.use(express.urlencoded({ extended: false })); 

server.disable('x-powered-by')

server.use(
    session({
      secret: process.env.SESSION_SECRET ||'supercalifragilisticexpialidocious', // ¡Ttendremos que cambiarlo en producción!
      resave: false, 
      saveUninitialized: false, 
      cookie: {
        maxAge: 3600000 // Milisegundos de duración de nuestra cookie, una hora
      },
      store: MongoStore.create({
        mongoUrl: db.DB_URL,
      })
    })
);

server.use(passport.initialize());
server.use(passport.session());

server.get("/", (_req, res) => {
    res.status(200).send('Home');
});

server.use('/teachers', [auth.isAuthenticated],teacherRouter);
server.use('/subjects', [auth.isAuthenticated],subjectRouter);
server.use('/users', usersRouter);
server.use('/timeSlots', [auth.isAuthenticated],timeSlotRouter);

server.use('*', (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    return next(error);
});

server.use((err, _req, res, _next) => {
    return res
        .status(err.status || 500)
        .json(err.message || 'Error on server');
});

db.connectDB().then(() => {
  console.log('Connnected to MongoDB')
  server.listen(PORT, () => {
  console.log(`Initialized server on: http://localhost:${PORT}`);
  });
});