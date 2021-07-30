"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _LeafletMap = _interopRequireDefault(require("../LeafletMap"));

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

var MapControl = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MapControl, _React$PureComponent);

  var _super = _createSuper(MapControl);

  function MapControl(props) {
    var _this;

    _classCallCheck(this, MapControl);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "initMap", function (element) {
      if (element) {
        var mapId = _this.props.mapId || 'leafletMap';
        var obj = _this.props.obj;
        var gxMap = new _LeafletMap["default"](mapId, obj);

        _this.setState({
          gxMap: gxMap
        });

        gxMap.resize();

        gxMap.onQueryFeature = function (geometry, e) {
          if (_this.props.onQueryFeature) {
            _this.props.onQueryFeature(geometry, e);
          }
        };

        gxMap.getCenterPointer = function (e) {
          if (_this.props.getCenterPointer) {
            _this.props.getCenterPointer(e);
          }
        };

        gxMap.onMouseMove = function (e) {
          if (_this.props.onMouseMove) {
            _this.props.onMouseMove(e);
          }
        };

        gxMap.onMouseRight = function (e) {
          if (_this.props.onMouseRight) {
            _this.props.onMouseRight(e);
          }
        };

        gxMap.onMouseDblclick = function (e) {
          if (_this.props.onMouseDblclick) {
            _this.props.onMouseDblclick(e);
          }
        };

        gxMap.onMouseDown = function (e) {
          if (_this.props.onMouseDown) {
            _this.props.onMouseDown(e);
          }
        };

        gxMap.onMouseUp = function (e, geometry) {
          if (_this.props.onMouseUp) {
            _this.props.onMouseUp(e, geometry);
          }
        };

        if (_this.props.onLoad) {
          _this.props.onLoad(gxMap);
        }
      }
    });

    _this.state = {};
    return _this;
  }

  _createClass(MapControl, [{
    key: "render",
    value: // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (this.props.bounds === null && nextProps.bounds != null) {
    //         let gxMap = this.state.gxMap
    //         if (gxMap) {
    //             gxMap.getMap().fitBounds(nextProps.bounds, {
    //                 padding: [100, 100],
    //                 linear: true
    //             });
    //         }
    //     }
    // }
    function render() {
      var _this2 = this;

      var mapId = this.props.mapId || 'leafletMap';
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: mapId,
        className: "brace-up",
        style: {
          height: "100%",
          minHeight: '300px'
        },
        ref: this.initMap
      }, _react["default"].Children.map(this.props.children, function (child) {
        if (child) {
          return /*#__PURE__*/_react["default"].cloneElement(child, {
            gxMap: _this2.state.gxMap
          });
        }

        return null;
      }));
    }
  }]);

  return MapControl;
}(_react["default"].PureComponent);

var _default = MapControl;
exports["default"] = _default;