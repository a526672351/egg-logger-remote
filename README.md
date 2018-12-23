# egg-logger-remote


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-logger-remote.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-logger-remote
[travis-image]: https://img.shields.io/travis/a526672351/egg-logger-remote.svg?style=flat-square
[travis-url]: https://travis-ci.org/a526672351/egg-logger-remote
[codecov-image]: https://img.shields.io/codecov/c/github/a526672351/egg-logger-remote.svg?style=flat-square
[codecov-url]: https://codecov.io/github/a526672351/egg-logger-remote?branch=master
[david-image]: https://img.shields.io/david/a526672351/egg-logger-remote.svg?style=flat-square
[david-url]: https://david-dm.org/a526672351/egg-logger-remote
[snyk-image]: https://snyk.io/test/npm/egg-logger-remote/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-logger-remote
[download-image]: https://img.shields.io/npm/dm/egg-logger-remote.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-logger-remote


<!--
Description here.
-->

## Install

```bash
$ npm i egg-logger-remote --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.loggerRemote = {
  enable: true,
  package: 'egg-logger-remote',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.loggerRemote = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

### Disable Logger

You and disable logger with `disable` config.

```js
exports.loggerRemote = {
  disable: [
    // won't upload this logger
    'myLogger',
  ],
}
```

### Transform and Filter

You can transform the log data before upload.

```js
exports.loggerRemote = {
  transform(log, args) {
    return log;
  },
}
```

If you want to ignore some log, you can return false when transform.

```js
exports.loggerRemote = {
  transform(log) {
    if (some condition) return false;
    return log;
  },
}
```
There is two arguments that transform have.

1. One is log object, it contains the default property, which is `ip`, `hostname`, `env`, `appName`, `loggerName`, `loggerFileName`, `level`. The last one is `content` that is the log string formated from the arguments when you call log method.
1. The other is original arguments when you call log method, it will not format to content.

### Data Structure

The data structure uploaded in below, you can create index in aliyun console as your wish.

- level: logger level
- content: the infomation that you logged
- ip: the host ip
- hostname: the host name
- env: the egg environment
- appName: the package name
- loggerName: the logger name defined by Egg
- loggerFileName: the logger file path

### Logger Level

The default logger in Egg contains two level: level and consoleLevel, If you want set level for sls, you can use `slsLevel`.

```js
// config/config.default.js
module.exports = {
  loggerRemote: {
    // for all logs
    remoteLevel: 'DEBUG',
  },
};
```

If `slsLevel` is not specified, it will use level instead.
## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/a526672351/egg/issues).

## License

[MIT](LICENSE)
