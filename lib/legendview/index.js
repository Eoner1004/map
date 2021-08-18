"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LegendView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(LegendView, _React$PureComponent);

  var _super = _createSuper(LegendView);

  function LegendView(props) {
    var _this;

    _classCallCheck(this, LegendView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "openImg", function (imgUrl) {
      _this.setState({
        visible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      _this.setState({
        visible: false
      });
    });

    _this.state = {
      visible: false,
      serviceItem: null
    };
    return _this;
  }

  _createClass(LegendView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //订阅服务
      this.pubsub_serviceitem = _pubsubJs["default"].subscribe('setServiceItem', function (topic, serviceItem) {
        console.log(serviceItem, 222);

        _this2.setState({
          serviceItem: serviceItem
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _pubsubJs["default"].unsubscribe(this.pubsub_serviceitem);
    }
  }, {
    key: "render",
    value: function render() {
      var time = new Date().getTime();
      var serviceItem = this.state.serviceItem;

      if (serviceItem && serviceItem.serviceType === 2) {
        var imgUrl = "".concat(this.props.datamgUrl, "services/getLegend?id=").concat(serviceItem.id, "&time=").concat(time);
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            position: 'absolute',
            bottom: '30px',
            right: '45px',
            zIndex: 1000,
            backgroundColor: '#fff',
            borderRadius: '3px'
          }
        }, this.state.visible ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
          type: "close",
          style: {
            "float": 'right',
            cursor: 'pointer',
            fontSize: 14,
            margin: 8
          },
          onClick: this.handleCancel
        }), /*#__PURE__*/_react["default"].createElement("img", {
          style: {
            border: '2px solid #fff',
            borderRadius: '3px'
          },
          src: imgUrl,
          alt: ""
        })) : /*#__PURE__*/_react["default"].createElement("div", {
          onClick: this.openImg,
          style: {
            fontSize: '14px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            width: 60,
            textAlign: 'center',
            padding: 6
          }
        }, "\u56FE\u4F8B"));
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);

  return LegendView;
}(_react["default"].PureComponent);

var _default = LegendView;
exports["default"] = _default;