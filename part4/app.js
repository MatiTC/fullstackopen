const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
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
//<---Router--->
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint); //error
app.use(middleware.errorHandler); //error de manejo

module.exports = app;
