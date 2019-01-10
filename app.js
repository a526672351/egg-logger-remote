'use strict';
const uuid = require('uuid');
const RemoteClient = require('./lib/remote_client');
const RemoteTransport = require('./lib/remote_transport');
const isReady = Symbol.for('egg_tracer_is_ready');

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
    if (!config.fileIO) {
      logger.disable('file');
    }
  }

  app.httpclient.on('request', req => {
    req.args.headers = req.args.headers || {};
    req.args.headers['x-tracer-id'] = req.ctx && req.ctx.traceId || uuid.v1();
    req.args.headers['x-tracer-name'] = app.config.name;
  });

  app.ready(() => {
    app[isReady] = true;
  });

};