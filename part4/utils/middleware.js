const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' });
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  // Encarga de obtener el token de la petición HTTP
  const authorization = request.get('authorization');
  // Si hay un token en el encabezado de autorización, lo extrae y lo adjunta a la solicitud
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = async ( req, res, next) => {
  // asumiendo que el token ya ha sido extraído por el middleware tokenExtractor
  const token = req.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No hay token proporcionado. Acceso no autorizado.' });
  }
  // Suponiendo que tienes un modelo de usuario y puedes buscarlo en la base de datos
  const decoded = await jwt.verify(token, SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Usuario no encontrado. Acceso no autorizado.' });
  }
  // Adjunta el usuario encontrado al objeto de solicitud
  req.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
