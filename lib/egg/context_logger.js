class ContextLogger extends require('egg-logger').EggContextLogger {
  constructor(ctx, logger) {
    super(ctx, logger);
    this.ctx = ctx;
    this._logger = logger;
  }

  get paddingMessage() {
    const ctx = this.ctx;

    // Auto record necessary request context infomation, e.g.: user id, request spend time
    // format: '[$userId/$ip/$traceId/$use_ms $method $url]'
    const userId = ctx.userId || '-';
    const traceId = ctx.tracer && ctx.tracer.traceId || '-';
    const use = ctx.starttime ? Date.now() - ctx.starttime : 0;
    return {
      userId,
      traceId,
      reqIp: ctx.ip,
      useTime: use + 'ms ',
      method: ctx.method,
      url: ctx.url
    };
  }
}
module.exports = ContextLogger;
