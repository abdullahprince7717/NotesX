var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

var authRouter = require('./routes/authRouter');
var noteRouter = require('./routes/notesRouter');
var tagRouter = require('./routes/tagsRouter');
var userRouter = require('./routes/userRouter');
var notificationRouter = require('./routes/notificationRouter');
const { database } = require('./config.json');
// var cron = require('node-cron');

// cron.schedule('* * * * * *', () => {
//   console.log('running a task every second');
// });

database == "postgres" ? null : require('./bin/mongoDbConnection');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NotesX API",
      version: "1.0.0",
      description:
        "A simple Express Library API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/authRouter.js", "./routes/notesRouter.js", "./routes/tagsRouter.js", "./routes/userRouter.js"]
};

const specs = swaggerJsDoc(options);

var app = express();
// app.set('view engine', 'js');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(
  {
    origin: true,
    credentials: true
  }
))

// app.use('/', userRouter);
app.use('/auth', authRouter);
app.use('/note', noteRouter);
app.use('/tag', tagRouter);
app.use('/user', userRouter);
app.use('/notification', notificationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
