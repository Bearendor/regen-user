const logger = require('../lib/logger');
import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction, Errback } from 'express';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl || '';
    if (url.indexOf('/api') === 0 && url.indexOf('/api/notifications') === -1) {
        req.api_id = uuid();
        logger.info(req, `${req.method} ${url} ; body: ${JSON.stringify(req.body)}`);
    }
    next();
};

const logErrors = function (err: Errback, req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl || '';
    logger.error(req, `${req.method} ${url} ; body ${JSON.stringify(req.body)}. err: ${JSON.stringify(err)}`);
    next(err);
};

export { 
  logRequest as logRequest,
  logErrors as logErrors
};
