"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;
exports.removeData = removeData;
exports.setData = setData;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  serverPort = 3283
} = _package.config;

function createRemoveRequest(keys) {
  if (!Array.isArray(keys)) {
    return {};
  }

  let obj = {};

  for (let i = 0; i < keys.length; ++i) {
    obj[keys[i]] = {
      $themisRemove: true
    };
  }

  return obj;
}

function getData() {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator(function* (...args) {
    return (0, _nodeFetch.default)(`http://localhost:${serverPort}/${args.join(",")}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(result => result.json());
  });
  return _getData.apply(this, arguments);
}

function removeData() {
  return _removeData.apply(this, arguments);
}

function _removeData() {
  _removeData = _asyncToGenerator(function* () {
    return (0, _nodeFetch.default)(`http://localhost:${serverPort}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createRemoveRequest(arguments))
    });
  });
  return _removeData.apply(this, arguments);
}

function setData(_x) {
  return _setData.apply(this, arguments);
}

function _setData() {
  _setData = _asyncToGenerator(function* (state) {
    return (0, _nodeFetch.default)(`http://localhost:${serverPort}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    });
  });
  return _setData.apply(this, arguments);
}
//# sourceMappingURL=themis.js.map