"use strict";

require("core-js/modules/es7.object.entries");

var _fs = require("fs");

var _hapi = require("hapi");

var _jsonfile = require("jsonfile");

var _package = require("../package.json");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  serverHost = "0.0.0.0",
  serverPort = 3283,
  stateFileName = "state.json"
} = _package.config;

if (!(0, _fs.existsSync)("./state")) {
  (0, _fs.mkdirSync)("./state");
}

if (!(0, _fs.existsSync)(`./state/${stateFileName}`)) {
  (0, _jsonfile.writeFileSync)(`./state/${stateFileName}`, {}, {
    spaces: 4
  });
}

class StateWrapper {
  static get state() {
    return (0, _jsonfile.readFileSync)(`./state/${stateFileName}`);
  }

  static set state(value) {
    (0, _jsonfile.writeFileSync)(`./state/${stateFileName}`, value, {
      spaces: 4
    });
  }

}

const server = new _hapi.Server({
  host: serverHost,
  port: serverPort,
  routes: {
    cors: {
      origin: "ignore"
    }
  }
});
server.route({
  method: "GET",
  path: "/{keys?}",
  handler: request => {
    const state = StateWrapper.state;
    const keys = request.params.keys ? request.params.keys.split(",") : Object.keys(state);
    return Object.entries(state).filter(([key, _]) => keys.some(k => k === key)).reduce((_ref, [key, value]) => {
      let prev = Object.assign({}, _ref);
      return _objectSpread({}, prev, {
        [key]: value
      });
    }, {});
  }
});
server.route({
  method: "POST",
  path: "/",
  handler: request => {
    let newState = StateWrapper.state;

    for (const _ref2 of Array.isArray(request.payload) ? request.payload : [request.payload]) {
      const state = Object.assign({}, _ref2);

      for (const [key, value] of Object.entries(state)) {
        if (value && value.$themisRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        } else {
          newState[key] = value;
        }
      }
    }

    StateWrapper.state = newState;
    return {
      success: true
    };
  }
});

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = _asyncToGenerator(function* () {
    try {
      yield server.start();
      console.log(`Server started on port ${serverPort}`);
    } catch (e) {
      console.error(e);
    }
  });
  return _startServer.apply(this, arguments);
}

startServer();
//# sourceMappingURL=server.js.map