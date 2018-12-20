'use strict';

const uuid = require('uuid');

const TRACE_ID = Symbol('traceId');
const TRACE_NAME = Symbol('TRACE_NAME');

class Tracer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  get traceId() {
    if (!this[TRACE_ID]) {
      this[TRACE_ID] = this.ctx.request.header['x-tracer-id'] || uuid.v1();
    }
    return this[TRACE_ID];
  }
  get traceName() {
    if (!this[TRACE_NAME]) {
      this[TRACE_NAME] = this.ctx.request.header['x-tracer-Name'] || '-';
    }
    return this[TRACE_NAME];
  }
}

module.exports = Tracer;