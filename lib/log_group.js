'use strict';

const assert = require('assert');
const is = require('is-type-of');
const LogGroupPB = require('./log').LogGroup;
const { getTimeSecond } = require('./utils');


class LogGroup {
  constructor() {
    this.logs = [];
  }

  getLogs() {
    return this.logs;
  }

  setLog(obj) {
    if (is.date(obj.time)) {
      obj.time = getTimeSecond(obj.time);
    }
    assert(is.number(obj.time), 'time should be integer');

    const contents = [];
    if (obj.contents) {
      for (const key of Object.keys(obj.contents)) {
        const value = obj.contents[key];
        contents.push({ key, value: is.string(value) ? value : String(value) });
      }
    }

    this.logs.push({
      time: obj.time,
      contents,
    });
  }

  encode() {
    const logGroup = {
      logs: this.logs,
    };

    return LogGroupPB.encode(logGroup).finish();
  }

  decode(buf) {
    return LogGroupPB.decode(buf);
  }
}

module.exports = LogGroup;