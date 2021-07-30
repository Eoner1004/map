"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MapControl = _interopRequireDefault(require("../components/Map/MapControl"));

var _BaseMapLayer = _interopRequireDefault(require("../components/Map/layer/BaseMapLayer"));

var _UrlLayer = _interopRequireDefault(require("../components/Map/layer/UrlLayer"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var MultiwindowMap = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MultiwindowMap, _React$PureComponent);

  var _super = _createSuper(MultiwindowMap);

  function MultiwindowMap(props) {
    var _this;

    _classCallCheck(this, MultiwindowMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "clearData", function () {
      _this.setState({
        showDataList: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMapload", function (gxMap) {
      var mapId = _this.props.mapId;

      _this.setState({
        gxMap: gxMap
      });

      if (_this.props.onMapload) {
        _this.props.onMapload(gxMap, mapId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (event) {
      event.persist();
      event.stopPropagation(); //阻止冒泡
      // let showData = this.props.mapData.get('dragData')

      var showData = {};

      var showDataList = _toConsumableArray(_this.state.showDataList);

      if (showData) {
        var newShowDataList = showDataList.filter(function (it) {
          return it.id !== showData.id;
        });
        newShowDataList.push(showData);

        _this.setState({
          showDataList: newShowDataList
        });

        var geometry = JSON.parse(showData.geometry);

        if (geometry) {
          _this.state.gxMap.locationGeometry(geometry);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeItem", function (item) {
      var showDataList = _toConsumableArray(_this.state.showDataList);

      var newShowDataList = showDataList.filter(function (it) {
        return it.id !== item.id;
      });

      _this.setState({
        showDataList: newShowDataList
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var mapId = _this.props.mapId;

      if (_this.props.onMouseMove) {
        _this.props.onMouseMove(e, mapId);
      }
    });

    _this.state = {
      gxMap: null,
      showDataList: [],
      haveMouse: false
    };
    return _this;
  }

  _createClass(MultiwindowMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        showDataList: []
      });
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      event.persist();
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var serviceType = this.props.serviceType;
      var serviceUrl = this.props.serviceUrl;
      var mapId = this.props.mapId;
      var styleObj = this.props.styleObj;
      var obj = {
        zoomNotShow: this.props.zoomNotShow,
        notShowZoomslider: this.props.notShowZoomslider
      };
      var mouseTop = this.props.mouseTop - 15 || 20;
      var mouseleft = this.props.mouseleft - 15 || 20;
      var haveMouse = this.props.haveMouse;
      var showDataList = this.props.showDataList;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: Object.assign({
          position: 'absolute'
        }, styleObj),
        onDrop: this.onDrop.bind(this),
        onDragOver: this.onDragOver.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_MapControl["default"], {
        mapId: mapId // bounds={bounds}
        ,
        obj: obj,
        onLoad: this.onMapload,
        onMouseMove: this.onMouseMove
      }, serviceType && serviceUrl && /*#__PURE__*/_react["default"].createElement(_BaseMapLayer["default"], {
        serviceType: serviceType,
        serviceUrl: serviceUrl
      }), showDataList && typeof showDataList !== 'string' && showDataList.length > 0 && showDataList.map(function (it, id) {
        return /*#__PURE__*/_react["default"].createElement(_UrlLayer["default"], {
          key: id,
          a: id,
          url: it
        });
      })), haveMouse !== mapId && /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
        type: "plus",
        style: {
          position: 'absolute',
          top: mouseTop,
          left: mouseleft,
          zIndex: 2000,
          fontSize: '30px',
          color: '#00ff00'
        }
      }));
    }
  }]);

  return MultiwindowMap;
}(_react["default"].PureComponent); // export default connect(state => ({
//     mapData: state.mapData,
// }))(MultiwindowMap)


var _default = MultiwindowMap;
exports["default"] = _default;