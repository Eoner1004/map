"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

require("./basemaplist.scss");

var _init = _interopRequireDefault(require("./init"));

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _MetaInfo = _interopRequireDefault(require("../components/Map/MetaInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function BaseMapCard(baseMapItem, mapId, imgUrl, _onClick) {
  return /*#__PURE__*/_react["default"].createElement("div", {
    key: baseMapItem.id,
    style: {
      boxShadow: ' 0 0 2px #aaa'
    },
    className: baseMapItem.id === mapId ? 'layer-li dot click' : 'layer-li dot',
    onClick: function onClick() {
      return _onClick(baseMapItem);
    }
  }, baseMapItem.icon ? /*#__PURE__*/_react["default"].createElement("img", {
    alt: baseMapItem.name,
    src: imgUrl + '/' + baseMapItem.icon
  }) : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "name dot basemap-name",
    style: {
      bottom: 0
    }
  }, baseMapItem.name));
}

var BaseMapList = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(BaseMapList, _React$PureComponent);

  var _super = _createSuper(BaseMapList);

  function BaseMapList(props) {
    var _this;

    _classCallCheck(this, BaseMapList);

    _this = _super.call(this, props);

    var baseMap = _this.getBaseMap();

    _this.state = {
      baseMap: baseMap
    };
    return _this;
  }

  _createClass(BaseMapList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //初始化请求
      var server = {
        axiosFn: this.props.axiosFn
      };

      _init["default"].init(server);

      var obj = {
        pageNum: 1,
        pageSize: 24,
        imgType: "Service",
        pos: {
          id: 1
        }
      };
      var url = null;

      var axiosFn = _init["default"].getAxiosFn();

      if (this.props.datamgUrl) {
        url = this.props.datamgUrl + "metainfo/retrieval";
      }

      if (url && axiosFn) {
        axiosFn.createAxios(axiosFn.getToken()).post(url, obj).then(function (res) {
          if (res.data.status === 200) {
            var data = _objectSpread({}, res.data.data);

            data.items.push({
              id: '1',
              name: '无'
            });
            var list = data.items ? data.items : [];
            var baseMap = localStorage.getItem('baseMap') || '';

            if (!baseMap) {
              localStorage.setItem('baseMap', JSON.stringify(list[0]));
            }

            _this2.setState({
              baseMapList: data
            });
          }
        });
      }
    }
  }, {
    key: "selectLayer",
    value: function selectLayer(item) {
      //let meatInfo = Object.assign(new MetaInfo(), item)
      localStorage.setItem('baseMap', JSON.stringify(item));
      this.setState({
        baseMap: item
      });
      var baseLayerMetaInfo = Object.assign(new _MetaInfo["default"](), item);

      _pubsubJs["default"].publish('changeBaseMap', baseLayerMetaInfo);
    }
  }, {
    key: "getBaseMap",
    value: function getBaseMap() {
      var baseMap = localStorage.getItem('baseMap') || '';

      if (baseMap) {
        return JSON.parse(baseMap);
      }

      return '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // let baseMapList = this.props.baseMapDva.get('baseMapList')
      var baseMapList = this.state.baseMapList;

      if (baseMapList) {
        var list = baseMapList.items ? baseMapList.items : [];
        var baseMap = this.state.baseMap;
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 500
          }
        }, /*#__PURE__*/_react["default"].createElement(_antd.Dropdown, {
          overlay: /*#__PURE__*/_react["default"].createElement("div", {
            className: "base-map-list cle"
          }, list.map(function (item, i) {
            return BaseMapCard(item, baseMap.id, _this3.props.imgUrl, _this3.selectLayer.bind(_this3));
          })),
          trigger: ['click']
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "layer-li dot",
          style: {
            width: '96px',
            height: '72px',
            border: '3px solid #fff',
            borderRadius: 4
          }
        }, baseMap.icon ? /*#__PURE__*/_react["default"].createElement("img", {
          alt: baseMap.name,
          style: {
            width: '100%',
            height: '100%',
            borderRadius: 4
          },
          src: this.props.imgUrl + '/' + baseMap.icon
        }) : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement("div", {
          className: "dot basemap-name",
          title: baseMap.name
        }, baseMap.name))));
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);

  return BaseMapList;
}(_react["default"].PureComponent);

var _default = BaseMapList;
exports["default"] = _default;