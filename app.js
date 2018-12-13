'use strict';
const RemoteTransport = require('./lib/remote_transport');

module.exports = (app) => {
  // app.getLogger('logger').set('remote', new RemoteTransport({ level: 'DEBUG', app }));
  app.logger.set('remote', new RemoteTransport({ level: 'DEBUG', app }));
  app.logger.disable('file');
  app.coreLogger.info('[egg-logger-remote] start logger transport to remote server');
};