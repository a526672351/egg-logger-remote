const Transport = require('egg-logger').Transport;
const { wrap } = require('aggregate-base');
const address = require('address');
const os = require('os');

const ip = address.ip();
const hostname = os.hostname();

class RemoteTransport extends Transport {
  constructor(options) {
    super(options);
    this.client = options.client;
    this.logTag = {
      ip,
      hostname,
      env: options.env,
      appName: options.appName,
      loggerName: options.loggerName,
      loggerFileName: options.loggerFileName,
    };
    this.transform = options.transform;
  }

  async upload(data) {
    await this.client.upload(data);
  }
}

module.exports = wrap(RemoteTransport, {
  interval: 1000,
  intercept: 'log',
  interceptTransform(level, args, meta) {
    // const content = this.log(level, args, meta);
    const content = this.log(level, args);
    const paddingMessage = meta && meta.paddingMessage;
    let contents = { level, content, ...this.logTag, ...paddingMessage };

    // set errorCode if the first argument is the instance of Error
    const err = args[0];
    if (err instanceof Error && err.code) {
      contents.errorCode = err.code;
    }

    // support transform
    if (this.transform) {
      contents = this.transform(contents, args);
      if (contents === false) return false;
    }

    return {
      time: new Date(),
      contents,
    };
  },
  flush: 'upload',
});;