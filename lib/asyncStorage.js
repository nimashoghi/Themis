"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncStorage = void 0;

require("core-js/modules/es7.object.entries");

var _themis = require("./themis");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const execute =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (operation, cb) {
    const callback = cb || ((_error, _result) => {});

    try {
      callback(undefined, (yield operation()));
    } catch (e) {
      callback(e, undefined);
      throw e;
    }
  });

  return function execute(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const first = (list, predicate) => {
  for (const item of list) {
    if (predicate(item)) {
      return item;
    }
  }

  throw new Error("No item matched predicate");
};

class AsyncStorage {
  static getItem(key, cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.getData)(key);
      }), cb);
    })();
  }

  static setItem(key, value, cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.setData)({
          [key]: value
        });
      }), cb);
    })();
  }

  static removeItem(key, cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.removeData)(key);
      }), cb);
    })();
  }

  static mergeItem(key, value, cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.setData)({
          [key]: _objectSpread({}, (yield (0, _themis.getData)(key)), JSON.parse(value))
        });
      }), cb);
    })();
  }

  static clear(cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.removeData)(...Object.keys((yield (0, _themis.getData)())));
      }), cb);
    })();
  }

  static getAllKeys(cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return Object.keys((yield (0, _themis.getData)()));
      }), cb);
    })();
  }

  static flushGetRequests() {// TODO
  }

  static multiGet([...keys], cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return Object.entries((yield (0, _themis.getData)(keys)));
      }), cb);
    })();
  }

  static multiSet([...kvPairs], cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.setData)(kvPairs.reduce((_ref10, [key, value]) => {
          let previous = Object.assign({}, _ref10);
          return _objectSpread({}, previous, {
            [key]: value
          });
        }, {}));
      }), cb);
    })();
  }

  static multiRemove([...keys], cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return yield (0, _themis.removeData)(...keys);
      }), cb);
    })();
  }

  static multiMerge([...kvPairs], cb = undefined) {
    return _asyncToGenerator(function* () {
      return execute(
      /*#__PURE__*/
      _asyncToGenerator(function* () {
        return Object.entries((yield (0, _themis.getData)(...kvPairs.map(([key, _]) => key)))).reduce((_ref14, [key, _ref13]) => {
          let previous = Object.assign({}, _ref14);
          let value = Object.assign({}, _ref13);
          return _objectSpread({}, previous, {
            [key]: _objectSpread({}, value, first(kvPairs, ([key_, _]) => key_ === key)[1])
          });
        });
      }), cb);
    })();
  }

}

exports.AsyncStorage = AsyncStorage;
//# sourceMappingURL=asyncStorage.js.map