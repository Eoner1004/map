"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MultiwindowMap = _interopRequireDefault(require("./MultiwindowMap"));

var _multiwindowMapList = require("./multiwindowMapList");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var mapList = [];

var Index = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onMultiwindowMapload", function (gxMap, mapId) {
      if (mapList.length === 4) {
        mapList = [];
      }

      var mapObj = {};
      mapObj.mapId = mapId;
      mapObj.map = gxMap;
      mapList.push(mapObj);

      if (mapList.length === 4) {
        for (var i = 0; i < mapList.length; i++) {
          var listA = mapList[i];

          for (var q = 0; q < mapList.length; q++) {
            var listB = mapList[q];

            if (listA.mapId !== listB.mapId) {
              var map1 = listA.map.getMap();
              var map2 = listB.map.getMap();
              map1.sync(map2);
            }
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e, mapId) {
      var containerPoint = e.containerPoint;
      var top = containerPoint.y;
      var left = containerPoint.x;

      _this.setState({
        mouseTop: top,
        mouseleft: left,
        haveMouse: mapId
      });
    });

    _this.state = {
      mouseTop: 10,
      mouseleft: 10,
      haveMouse: null
    };
    return _this;
  }

  _createClass(Index, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          url = _this$props.url,
          serviceType = _this$props.serviceType,
          serviceUrl = _this$props.serviceUrl;
      var haveMouse = this.state.haveMouse;
      var mouseTop = this.state.mouseTop || 20;
      var mouseleft = this.state.mouseleft || 20;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "brace-up"
      }, _multiwindowMapList.multiwindowMapList.map(function (it, index) {
        return /*#__PURE__*/_react["default"].createElement(_MultiwindowMap["default"], {
          showDataList: [url[index]],
          key: it.mapId,
          onMapload: _this2.onMultiwindowMapload,
          notShowZoomslider: it.notShowZoomslider,
          zoomNotShow: it.zoomNotShow,
          mapId: it.mapId,
          serviceType: serviceType,
          serviceUrl: serviceUrl,
          styleObj: it.styleObj,
          onMouseMove: _this2.onMouseMove,
          mouseTop: mouseTop,
          mouseleft: mouseleft,
          haveMouse: haveMouse
        });
      }));
    }
  }]);

  return Index;
}(_react.Component);

var _default = Index;
exports["default"] = _default;