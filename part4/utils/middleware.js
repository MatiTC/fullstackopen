const logger = require('./logger');

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
    console.log('Token extraído:', request.token);
  }
  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
