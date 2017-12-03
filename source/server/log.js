import logger from 'bunyan-request-logger';
import config from 'config';

const loggerSettings = {
    name: config.get('name'),
    logParams: config.get('log.params'), // so we don't pollute logs.
};

export default logger(loggerSettings);
