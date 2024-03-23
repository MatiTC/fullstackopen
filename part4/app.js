const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
require('express-async-errors');

mongoose.set('strictQuery', false);
logger.info('Conexión al DB');
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info('conexión a MongoDB');
  })
  .catch((error) => {
    logger.error('error al conectar con la DB', error.message);
  });

app.use(cors()); //Nos permite comunicación con el front
// app.use(express.static('dist'))// permite mostrar contenido estático
app.use(express.json()); //nos permite acceder al res.body
app.use(middleware.requestLogger); //info
//<---jsw--->
app.use(middleware.tokenExtractor);
//<---Router--->
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.unknownEndpoint); //error
app.use(middleware.errorHandler); //error de manejo

module.exports = app;
