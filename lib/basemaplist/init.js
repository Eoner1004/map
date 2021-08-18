"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Init = /*#__PURE__*/function () {
  function Init() {
    var _this = this;

    _classCallCheck(this, Init);

    _defineProperty(this, "getAxiosFn", function () {
      if (_this.axiosFn) {
        return _this.axiosFn;
      }
    });

    _defineProperty(this, "getServerUrl", function () {
      if (_this.serverUrl) {
        return _this.serverUrl;
      }
    });

    this.serverUrl = null;
    this.axiosFn = null;
  }

  _createClass(Init, [{
    key: "init",
    value: function init(obj) {
      if (obj) {
        if (obj.serverUrl) {
          this.serverUrl = obj.serverUrl;
        }

        if (obj.axiosFn) {
          this.axiosFn = obj.axiosFn;
        }
      }
    }
  }]);

  return Init;
}();

var initData = new Init();
var _default = initData;
exports["default"] = _default;