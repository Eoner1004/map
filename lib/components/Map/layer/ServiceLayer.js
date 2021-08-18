"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _leaflet = _interopRequireDefault(require("leaflet"));

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

function getMaxMinZoom(serviceInfo) {
  if (!serviceInfo.layers) return {
    maxZoom: 24,
    minZoom: 1
  };
  var maxZoom = null;
  var minZoom = null;
  serviceInfo.layers.forEach(function (layer) {
    if (layer) {
      if (layer.maxLevel) {
        maxZoom = maxZoom ? Math.max(maxZoom, layer.maxLevel) : layer.maxLevel;
      }

      if (layer.minLevel) {
        minZoom = minZoom ? Math.min(minZoom, layer.minLevel) : layer.minLevel;
      }
    }
  });

  if (maxZoom === null || minZoom === null) {
    return {
      maxZoom: 24,
      minZoom: 1
    };
  }

  if (minZoom === 0 || minZoom === '0') {
    minZoom = 1;
  }

  return {
    maxZoom: maxZoom,
    minZoom: minZoom
  };
}

var ServiceLayer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ServiceLayer, _React$PureComponent);

  var _super = _createSuper(ServiceLayer);

  function ServiceLayer() {
    _classCallCheck(this, ServiceLayer);

    return _super.apply(this, arguments);
  }

  _createClass(ServiceLayer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeLayers();
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMapLayer(this.props);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // let result = lodash.eq(this.props.serviceItem, nextProps.serviceItem)
      var result = JSON.stringify(this.props.serviceItem) === JSON.stringify(nextProps.serviceItem);

      if (!result) {
        this.updateMapLayer(nextProps);
      }
    }
  }, {
    key: "updateMapLayer",
    value: function updateMapLayer(props) {
      if (props.gxMap) {
        var serviceItem = props.serviceItem;

        if (this.layerId) {
          this.removeLayers();
        } // let layers = serviceItem.layers.map(it => it.name)


        var layers = [];

        if (serviceItem.layers) {
          serviceItem.layers.forEach(function (it) {
            if (it) {
              layers.push(it.name);
            }
          });
        }

        var layer = this.createMapServiceLayer(serviceItem, layers);

        if (props.layerGroup) {
          props.layerGroup.addLayer(layer);
        } else {
          if (props.gxMap && layer) {
            layer.addTo(props.gxMap.getMap());
          }
        }

        if (layer) {
          this.layerId = layer._leaflet_id;
        }
      }
    }
  }, {
    key: "createMapServiceLayer",
    value: function createMapServiceLayer(serviceInfo, layers) {
      var opt = getMaxMinZoom(serviceInfo);
      var cache = true;

      if (serviceInfo.isCache) {
        cache = false;
      }

      var time = new Date().getTime();
      var serviceLayer = null;

      if (layers && layers.length > 0) {
        serviceLayer = _leaflet["default"].tileLayer(serviceInfo.datamgUrl + "services/tile?x={x}&y={y}&l={z}&crs=EPSG:3857&serviceId=" + serviceInfo.id + '&time=' + time + '&layers=' + layers + '&cache=' + cache, opt);
        serviceLayer.setZIndex(100);
      }

      return serviceLayer;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }
  }]);

  return ServiceLayer;
}(_react["default"].PureComponent);

var _default = ServiceLayer;
exports["default"] = _default;