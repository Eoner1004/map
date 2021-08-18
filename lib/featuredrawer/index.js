"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _init = _interopRequireDefault(require("./init"));

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _FeatureResult = _interopRequireDefault(require("./FeatureResult"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var FeatureQueryView = /*#__PURE__*/function (_React$Component) {
  _inherits(FeatureQueryView, _React$Component);

  var _super = _createSuper(FeatureQueryView);

  function FeatureQueryView(props) {
    var _this;

    _classCallCheck(this, FeatureQueryView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        featureList: []
      });

      _pubsubJs["default"].publish('featureGeometry', []);
    });

    _this.state = {
      featureList: []
    };
    return _this;
  }

  _createClass(FeatureQueryView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var server = {
        axiosFn: this.props.axiosFn
      };

      _init["default"].init(server);

      var axiosFn = _init["default"].getAxiosFn();

      var url = null;

      if (this.props.datamgUrl) {
        url = this.props.datamgUrl + "feature/query";
      } //订阅元信息要素监听事件


      this.pubsub_queryfeature = _pubsubJs["default"].subscribe('queryFeature', function (topic, obj) {
        var geometry = obj.geometry;
        var params = {
          geoJson: JSON.stringify(geometry),
          isLoadGeometry: true
        };

        if (url) {
          if (obj.type === 'meta' && obj.metaIds && obj.metaIds.length) {
            var list = _toConsumableArray(obj.metaIds);

            var funcList = [];

            for (var i = 0; i < list.length; i++) {
              var _obj = _objectSpread({}, params);

              _obj.fromIds = [list[i]];
              _obj.classObjectId = list[i];
              funcList.push(axiosFn.createAxios(axiosFn.getToken()).post(url, _obj));
            }

            _axios["default"].all(funcList).then(function (resList) {
              var dataList = [];

              for (var q = 0; q < resList.length; q++) {
                var res = resList[q];

                if (res.data.status === 200) {
                  var data = res.data.data;

                  if (data.items && data.items.length > 0) {
                    dataList = [].concat(_toConsumableArray(dataList), _toConsumableArray(data.items));
                  }
                }
              }

              if (dataList && dataList.length) {
                var geometrys = dataList.map(function (feature) {
                  return JSON.parse(feature.geom);
                });

                _pubsubJs["default"].publish('featureGeometry', geometrys);

                _this2.setState({
                  featureList: dataList
                });
              } else {
                _pubsubJs["default"].publish('featureGeometry', []);

                _this2.setState({
                  featureList: []
                });
              }
            });
          } else if (obj.type === 'ser' && obj.serviceItem) {
            var serviceIds = [];
            serviceIds.push(obj.serviceItem.id);
            params.serviceIds = serviceIds;
            axiosFn.createAxios(axiosFn.getToken()).post(url, params).then(function (res) {
              if (res.data.status === 200) {
                var data = res.data.data;

                if (data.items && data.items.length > 0) {
                  var geometrys = data.items.map(function (feature) {
                    return JSON.parse(feature.geom);
                  });

                  _pubsubJs["default"].publish('featureGeometry', geometrys);

                  _this2.setState({
                    featureList: data.items
                  });
                } else {
                  _pubsubJs["default"].publish('featureGeometry', []);

                  _this2.setState({
                    featureList: []
                  });
                }
              }
            });
          }
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _pubsubJs["default"].unsubscribe(this.pubsub_queryfeature);
    }
  }, {
    key: "render",
    value: function render() {
      // let featureList = this.props.feature.get('featureList')
      var imgUrl = this.props.imgUrl;
      var featureList = this.state.featureList;
      var visible = featureList && featureList.length !== 0;
      return /*#__PURE__*/_react["default"].createElement(_antd.Drawer, {
        className: "feature-sttr",
        title: "\u5C5E\u6027",
        bodyStyle: {
          padding: '0px'
        },
        onClose: this.onClose,
        visible: visible,
        mask: false,
        width: 400
      }, /*#__PURE__*/_react["default"].createElement(_FeatureResult["default"], {
        imgUrl: imgUrl,
        list: featureList,
        feaVersion: this.props.feaVersion
      }));
    }
  }]);

  return FeatureQueryView;
}(_react["default"].Component);

var _default = FeatureQueryView;
exports["default"] = _default;