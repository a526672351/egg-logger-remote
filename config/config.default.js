'use strict';

/**
 * egg-logger-remote default config
 * @member Config#loggerRemote
 * @property {String} SOME_KEY - some description
 */
exports.loggerRemote = {
  endpoint: '',
  disable: [],
  protobuf: true,
  fileIO: false,
  transform: null
};

/**
 * tracer config
 * @member Config#tracer
 * @property {Tracer} Class - tracer class name
 */
exports.tracer = {
  Class: require('../lib/tracer/init'),
};