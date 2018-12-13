import { Transport } from 'egg-logger';

class RemoteErrorTransport extends Transport {

  // 定义 log 方法，在此方法中把日志上报给远端服务
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    this.options.app.curl('http://url/to/remote/error/log/service/logs', {
      data: msg,
      method: 'POST',
    }).catch(console.error);
  }
}
export default RemoteErrorTransport;