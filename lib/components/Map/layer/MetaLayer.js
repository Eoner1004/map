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

// import { datamgUrl } from '../../../../../service/common' 在metainfo内传入
var MetaLayer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MetaLayer, _React$PureComponent);

  var _super = _createSuper(MetaLayer);

  function MetaLayer() {
    _classCallCheck(this, MetaLayer);

    return _super.apply(this, arguments);
  }

  _createClass(MetaLayer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeLayers();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.layerIndex = this.props.layerIndex;
      this.metaInfoId = this.props.metaInfo.id;
      this.updateMapLayer(this.props);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var layerIndex = this.layerIndex !== nextProps.layerIndex;
      var metaInfoId = this.metaInfoId !== nextProps.metaInfo.id;

      if (layerIndex || metaInfoId) {
        this.layerIndex = nextProps.layerIndex;
        this.metaInfoId = nextProps.metaInfo.id;
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
        var metaInfo = props.metaInfo;

        if (this.layerId) {
          this.removeLayers();
        }

        layer = this.createMetaMapLayer(metaInfo);

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
    value: function createGxLayer(metaData) {
      var url = metaData.datamgUrl + "services/preview?crs=EPSG:3857&l={z}&x={x}&y={y}&metaId=" + metaData.id;
      var bounds = null;

      if (metaData.geometry) {
        try {
          var geometry = JSON.parse(metaData.geometry);
          var box = (0, _bbox["default"])(geometry);

          var corner1 = _leaflet["default"].latLng(box[1], box[0]);

          var corner2 = _leaflet["default"].latLng(box[3], box[2]);

          bounds = _leaflet["default"].latLngBounds(corner1, corner2);
        } catch (error) {}
      }

      var layer = new _leaflet["default"].TileLayer(url, bounds == null ? {} : {
        bounds: bounds,
        maxZoom: 24
      });
      var index = 950;

      if (this.layerIndex) {
        index = 950 + this.layerIndex * 5;
      }

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
    value: function createMetaMapLayer(metaData) {
      if (metaData.notShow) {
        return null;
      }

      var layer = null;

      if (metaData.imgType === "Raster" || metaData.imgType === "Vector" || metaData.imgType === "Dem") {
        layer = this.createGxLayer(metaData);
      } else if (metaData.imgType === "Service") {
        var serviceType = metaData.attributes.find(function (it) {
          return it.field.name === 'serviceType';
        });
        var serviceUrl = metaData.attributes.find(function (it) {
          return it.field.name === 'serviceUrl';
        }); //版权

        var attribution = metaData.attributes.find(function (it) {
          return it.field.name === 'attribution';
        });

        if (serviceType && serviceUrl) {
          if (serviceType.value === "esri") {
            layer = this.createServiceLayer(serviceUrl);
          } else if (serviceType.value === "xyz") {
            layer = this.createXyzServiceLayer(serviceUrl, attribution);
          }
        }
      }

      this.metaData = metaData;
      return layer;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);

  return MetaLayer;
}(_react["default"].PureComponent);

var _default = MetaLayer;
exports["default"] = _default;