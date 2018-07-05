import createError from 'http-errors';
import httpErrorConfig from '../configs/httperror.config.json';
import logger from '../services/LoggerService';

function NotFoundErrorHandler(req, res, next) {
    next(createError(404, httpErrorConfig[404]));
}

function HttpErrorHandler(err, req, res, next) {
    const errorCode = (err.status || 500).toString();
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(`${errorCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${new Date().toISOString()}`);
    next(createError(errorCode, httpErrorConfig[errorCode]));
}

export {
    NotFoundErrorHandler,
    HttpErrorHandler
};