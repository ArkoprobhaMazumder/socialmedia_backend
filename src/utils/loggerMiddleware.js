

import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [new winston.transports.File({ filename: 'log.txt' })]
})

const loggerMiddleware = async (req, res, next) => {
    try {
        if (!req.url.includes('/login' || '/signup')) {
            let logData = `${req.url} -> ${JSON.stringify(req.body)}`;
            logger.info(logData);
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default loggerMiddleware;