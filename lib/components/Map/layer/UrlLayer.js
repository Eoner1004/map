"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

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

var UrlLayer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(UrlLayer, _React$PureComponent);

  var _super = _createSuper(UrlLayer);

  function UrlLayer() {
    _classCallCheck(this, UrlLayer);

    return _super.apply(this, arguments);
  }

  _createClass(UrlLayer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeLayers();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.layerIndex = this.props.layerIndex
      // this.metaInfoId = this.props.metaInfo.id
      this.updateMapLayer(this.props);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var url = this.url !== nextProps.url;

      if (url) {
        this.updateMapLayer(nextProps);
      } // let result = lodash.eq(this.metaInfo, nextProps.metaInfo)
      // if (!result) {
      //     this.updateMapLayer(nextProps)
      // }

    }
  }, {
    key: "updateMapLayer",
    value: function updateMapLayer(props) {
      var layer = null;

      if (props.gxMap) {
        var url = props.url;

        if (this.layerId) {
          this.removeLayers();
        }

        layer = this.createMetaMapLayer(url);

        if (layer) {
          if (props.layerGroup) {
            props.layerGroup.addLayer(layer);
          } else {
            if (props.gxMap) {
              layer.addTo(props.gxMap.getMap());
            }
          }

          this.layerId = layer._leaflet_id;
        }
      }

      if (this.props.onRef) {
        this.props.onRef(layer);
      }
    }
  }, {
    key: "removeLayers",
    value: function removeLayers() {
      if (this.props.gxMap) {
        var lmap = this.props.gxMap.getMap();

        if (this.layerId && lmap) {
          var layer = lmap._layers[this.layerId];

          if (layer) {
            lmap.removeLayer(layer);
          }
        }
      }
    }
    /**
    * 创建元信息图层  影像 矢量  dem
    */

  }, {
    key: "createGxLayer",
    value: function createGxLayer(url) {
      var layer = new _leaflet["default"].TileLayer(url);
      var index = 950; // if (this.layerIndex) {
      //     index = 950 + this.layerIndex * 5
      // }

      layer.setZIndex(index);
      return layer;
    }
  }, {
    key: "createServiceLayer",
    value: function createServiceLayer(serviceUrl) {// let layer = esri.dynamicMapLayer({
      //     url: serviceUrl.value,
      //     transparent: true,
      //     f: 'image',
      //     opacity: 0.8
      // })
      // layer.setZIndex(900)
      // return layer
    }
  }, {
    key: "createXyzServiceLayer",
    value: function createXyzServiceLayer(serviceUrl, attribution) {
      var layer = _leaflet["default"].tileLayer(serviceUrl.value, {
        maxZoom: 24,
        minZoom: 0
      });

      layer.setZIndex(900);
      return layer;
    }
    /**
    * 创建图层id，用来存储
    * @param {*} action 
    * @param {*} tempLayer 
    */

  }, {
    key: "createMetaMapLayer",
    value: function createMetaMapLayer(url) {
      var layer = null;
      layer = this.createGxLayer(url);
      this.url = url;
      return layer;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);

  return UrlLayer;
}(_react["default"].PureComponent);

var _default = UrlLayer;
exports["default"] = _default;