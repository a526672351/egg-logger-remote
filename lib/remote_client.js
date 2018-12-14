'use strict';
// const assert = require('assert');
const zlib = require('mz/zlib');
const is = require('is-type-of');

class Client {
  constructor(app) {
    this.app = app;
  }

  async upload(logs) {
    const headers = {
      Date: new Date().toGMTString(),
      'x-log-apiversion': '0.6.0',
      'x-log-signaturemethod': 'hmac-sha1',
    };

    let body = logs;
    if (body) {
      if (is.buffer(body)) {
        headers['x-log-bodyrawsize'] = body.length;

        body = await zlib.deflate(body);
        headers['x-log-compresstype'] = 'deflate';
        headers['Content-Type'] = 'application/x-protobuf';
      } else {
        body = new Buffer(JSON.stringify(body));
        headers['x-log-bodyrawsize'] = body.length;
        headers['Content-Type'] = 'application/json';
      }

    } else {
      headers['x-log-bodyrawsize'] = 0;
    }
    
    return await this.app.curl(this.app.config.loggerRemote.endpoint, {
      content: body,
      headers,
      dataType: 'json',
      timeout: 30000,
      method: 'POST'
    }).catch(console.error);
  }

}

module.exports = Client;