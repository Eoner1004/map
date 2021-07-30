"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _leaflet = _interopRequireDefault(require("leaflet"));

require("./leafletSide/layout.css");

require("./leafletSide/range.css");

require("./leafletSide/leaflet-side-by-side");

var _MapControl = _interopRequireDefault(require("../components/Map/MapControl"));

var _BaseMapLayer = _interopRequireDefault(require("../components/Map/layer/BaseMapLayer"));

var _UrlLayer = _interopRequireDefault(require("../components/Map/layer/UrlLayer"));

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

var RollerMap = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(RollerMap, _React$PureComponent);

  var _super = _createSuper(RollerMap);

  function RollerMap(props) {
    var _this;

    _classCallCheck(this, RollerMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "openRoller", function () {
      var map = _this.state.gxMap.getMap();

      var sideMap = _leaflet["default"].control.sideBySide(null, null).addTo(map);

      _this.setState({
        sideMap: sideMap
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeRoller", function () {
      var sideMap = _this.state.sideMap;

      if (sideMap) {
        sideMap.remove();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMapload", function (gxMap) {
      var mapId = _this.props.mapId;

      _this.setState({
        gxMap: gxMap
      }, function () {
        _this.openRoller();
      });

      if (_this.props.onMapload) {
        _this.props.onMapload(gxMap, mapId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (event) {
      event.persist();
      event.stopPropagation(); //阻止冒泡

      var sideMap = _this.state.sideMap;
      var cX = event.clientX - 320;
      var left = sideMap._divider.style.left;
      var leftNum = left.replace('px', '');
      leftNum = Number(leftNum); // let showData = this.props.mapData.get('dragData')

      var showData = _this.props.showData;

      if (showData) {
        if (cX < leftNum) {
          _this.setState({
            leftData: showData
          });

          _this.location(showData);
        } else {
          _this.setState({
            rightData: showData
          });

          _this.location(showData);
        } // let leftData = this.state.leftData
        // let rightData = this.state.rightData
        // if (!leftData) {
        //     this.setState({
        //         leftData: showData
        //     })
        //     this.location(showData)
        // } else if (!rightData) {
        //     this.setState({
        //         rightData: showData
        //     })
        //     this.location(showData)
        // }

      }
    });

    _defineProperty(_assertThisInitialized(_this), "location", function (showData) {
      var geometry = JSON.parse(showData.geometry);
      var gxMap = _this.state.gxMap;

      if (geometry && gxMap) {
        gxMap.locationGeometry(geometry);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onLeftLayer", function (layer) {
      _this.leftLayer = layer; // this.openRoller()

      var sideMap = _this.state.sideMap;

      if (sideMap) {
        sideMap.setLeftLayers(_this.leftLayer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRightLayer", function (layer) {
      _this.rightLayer = layer;
      var sideMap = _this.state.sideMap;

      if (sideMap) {
        sideMap.setRightLayers(_this.rightLayer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeItem", function (num) {
      if (num === 1) {
        _this.setState({
          leftData: null
        });

        _this.onLeftLayer(null);
      } else {
        _this.setState({
          rightData: null
        });

        _this.onRightLayer(null);
      }
    });

    _this.state = {
      gxMap: null,
      sideMap: null,
      leftData: null,
      rightData: null
    };
    _this.leftLayer = null;
    _this.rightLayer = null;
    return _this;
  }

  _createClass(RollerMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // this.props.dispatch({
      //     type: 'mapData/closeSelectList',
      // })
      this.closeRoller();
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
      // let baseLayerMetaInfo = this.props.baseLayerMetaInfo
      var url = this.props.url;
      var serviceType = this.props.serviceType;
      var serviceUrl = this.props.serviceUrl;
      var mapId = this.props.mapId;
      var sideMap = this.state.sideMap; // let leftData = this.state.leftData
      // let rightData = this.state.rightData

      var leftData = url[0];
      var rightData = url[1];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "brace-up rollermap",
        onDrop: this.onDrop.bind(this),
        onDragOver: this.onDragOver.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_MapControl["default"], {
        mapId: mapId,
        onLoad: this.onMapload
      }, serviceType && serviceUrl && /*#__PURE__*/_react["default"].createElement(_BaseMapLayer["default"], {
        serviceType: serviceType,
        serviceUrl: serviceUrl
      }), leftData && sideMap && /*#__PURE__*/_react["default"].createElement(_UrlLayer["default"], {
        onRef: this.onLeftLayer,
        key: 1,
        url: leftData
      }), rightData && sideMap && /*#__PURE__*/_react["default"].createElement(_UrlLayer["default"], {
        onRef: this.onRightLayer,
        key: 2,
        url: rightData
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "roller-title-t"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        title: leftData ? leftData.name : '无'
      }, "\u5DE6\u4FA7\uFF1A", /*#__PURE__*/_react["default"].createElement("div", {
        className: "dot",
        style: {
          display: 'inline-block',
          maxWidth: '140px'
        }
      }, leftData ? leftData.name : '无')), /*#__PURE__*/_react["default"].createElement("div", {
        title: rightData ? rightData.name : '无'
      }, "\u53F3\u4FA7\uFF1A", /*#__PURE__*/_react["default"].createElement("div", {
        className: "dot",
        style: {
          display: 'inline-block',
          maxWidth: '140px'
        }
      }, rightData ? rightData.name : '无'))));
    }
  }]);

  return RollerMap;
}(_react["default"].PureComponent); // export default connect(state => ({
//     mapData: state.mapData,
// }))(RollerMap)


var _default = RollerMap;
exports["default"] = _default;