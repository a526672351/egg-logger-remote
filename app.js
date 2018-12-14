'use strict';
const RemoteClient = require('./lib/remote_client');
const RemoteTransport = require('./lib/remote_transport');

module.exports = (app) => {
  const config = app.config.loggerRemote;
  const client = new RemoteClient(app);
  // app.getLogger('logger').set('remote', new RemoteTransport({ level: 'DEBUG', app }));
  app.coreLogger.info('[egg-logger-remote] start logger transport to remote server');

  for (const [ name, logger ] of app.loggers.entries()) {
    if (config.disable.includes(name)) continue;

    const transport = new RemoteTransport({
      level: logger.options.remoteLevel || logger.options.level,
      client,
      transform: config.transform,
      env: app.config.env,
      appName: app.config.name,
      loggerName: name,
      loggerFileName: logger.options.file,
    });
    logger.set('remote', transport);
    logger.disable('file');
  }

};