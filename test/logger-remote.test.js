'use strict';

const mock = require('egg-mock');

describe('test/logger-remote.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/logger-remote-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, loggerRemote')
      .expect(200);
  });
});
