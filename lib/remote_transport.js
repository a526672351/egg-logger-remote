const Transport = require('egg-logger').Transport;

class RemoteTransport extends Transport {

  // 定义 log 方法，在此方法中把日志上报给远端服务
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    this.options.app.curl(this.options.app.config.loggerRemote, {
      data: msg,
      method: 'POST',
    }).catch(console.error);
  }
}
module.exports = RemoteTransport;