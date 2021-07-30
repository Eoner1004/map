"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = _interopRequireDefault(require("leaflet"));

var _bboxPolygon = _interopRequireDefault(require("@turf/bbox-polygon"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var turf = _interopRequireWildcard(require("@turf/turf"));

var _GxMap2 = _interopRequireDefault(require("./GxMap"));

require("./control/position/L.Control.MousePosition");

require("./control/position/L.Control.MousePosition.css");

require("./control/zoom/L.Control.Zoomslider");

require("./control/zoom/L.Control.Zoomslider.css");

require("./control/zoomlabel/L.Control.ZoomLabel");

require("./control/zoomlabel/L.Control.ZoomLabel.css");

require("./L.Map.Sync");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * 地图
 */
var LeafletMap = /*#__PURE__*/function (_GxMap) {
  _inherits(LeafletMap, _GxMap);

  var _super = _createSuper(LeafletMap);

  function LeafletMap(container, obj) {
    var _this;

    _classCallCheck(this, LeafletMap);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "addMarkerList", function (point) {
      _this.deleteMarker();

      var markers = [];
      var iconOptions = {
        // iconUrl: `${IMAGE_PATH}/ws.png`,
        iconSize: [25, 35]
      };

      var customIcon = _leaflet["default"].icon(iconOptions);

      var markerOptions = {
        icon: customIcon
      };

      var mar = _leaflet["default"].marker(point, markerOptions);

      mar.setZIndexOffset(9999);
      mar.addTo(_this.map);
      markers.push(mar);
      _this.marker = markers.map(function (item) {
        return item._leaflet_id;
      });
      return _this.marker;
    });

    _defineProperty(_assertThisInitialized(_this), "deleteMarker", function () {
      if (_this.marker) {
        _this.marker.forEach(function (it) {
          var layer = _this.map._layers[it];

          if (layer) {
            _this.map.removeLayer(layer);
          }
        });
      }
    });

    _this.map = _this.createMap(container, obj);

    _this.initMapEvent(_this.map);

    return _this;
  }

  _createClass(LeafletMap, [{
    key: "createMap",
    value: function createMap(container, obj) {
      var map = _leaflet["default"].map(container, {
        center: [33.7286578, 107.402338],
        zoom: 4,
        zoomControl: false,
        crs: _leaflet["default"].CRS.EPSG3857,
        minZoom: 3,
        maxBounds: _leaflet["default"].latLngBounds(_leaflet["default"].latLng(-90, -180), _leaflet["default"].latLng(90, 180)),
        attributionControl: false
      });

      if (obj && obj.zoomNotShow) {} else {
        _leaflet["default"].control.mousePosition({
          position: 'bottomright'
        }).addTo(map);
      }

      if (obj && obj.notShowZoomslider) {} else {
        _leaflet["default"].control.zoomslider({
          position: "bottomright"
        }).addTo(map);

        _leaflet["default"].control.zoomLabel({
          position: "bottomright"
        }).addTo(map);
      } // L.control.mousePosition({ position: 'bottomright' }).addTo(map);
      // L.control.zoomslider({
      //     position: "bottomright"
      // }).addTo(map);
      // L.control.zoomLabel({
      //     position: "bottomright"
      // }).addTo(map);


      return map;
    }
  }, {
    key: "initMapEvent",
    value: function initMapEvent(map) {
      var _this2 = this;

      map.on('click', function (e) {
        // if (this.onQueryFeature) {
        //     this.onQueryFeature(e)
        // }
        var point = e.layerPoint;
        var maxPoint = {
          x: point.x + 5,
          y: point.y + 5
        };
        var minPoint = {
          x: point.x - 5,
          y: point.y - 5
        };
        var max = map.layerPointToLatLng(maxPoint);
        var min = map.layerPointToLatLng(minPoint);
        var box = (0, _bboxPolygon["default"])([min.lng, min.lat, max.lng, max.lat]);
        var geometry = box.geometry;

        if (_this2.onQueryFeature) {
          _this2.onQueryFeature(geometry);
        }

        if (_this2.getCenterPointer) {
          _this2.getCenterPointer(e);
        }
      });
      map.on('mousemove', function (e) {
        if (_this2.onMouseMove) {
          _this2.onMouseMove(e);
        }
      });
      map.on('contextmenu', function (e) {
        if (_this2.onMouseRight) {
          _this2.onMouseRight(e);
        }
      });
      map.on('dblclick', function (e) {
        if (_this2.onMouseDblclick) {
          _this2.onMouseDblclick(e);
        }
      });
      map.on('mousedown', function (e) {
        if (_this2.onMouseDown) {
          _this2.onMouseDown(e);
        }
      });
      map.on('mouseup', function (e) {
        var point = e.layerPoint;
        var maxPoint = {
          x: point.x + 1,
          y: point.y + 1
        };
        var minPoint = {
          x: point.x - 1,
          y: point.y - 1
        };
        var max = map.layerPointToLatLng(maxPoint);
        var min = map.layerPointToLatLng(minPoint);
        var box = (0, _bboxPolygon["default"])([min.lng, min.lat, max.lng, max.lat]);
        var geometry = box.geometry;

        if (_this2.onMouseUp) {
          _this2.onMouseUp(e, geometry);
        }
      });
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this.map;
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layerId) {
      if (layerId) {
        var layer = this.map._layers[layerId];

        if (layer) {
          this.map.removeLayer(layer);
        }
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      if (this.map) {
        this.map._onResize();
      }
    }
  }, {
    key: "setDragging",
    value: function setDragging(state) {
      if (this.map) {
        if (state) {
          this.map.dragging.enable();
        } else {
          this.map.dragging.disable();
        }
      }
    }
    /**
     * 定位元信息,根据元信息的外接边框进行定位
     * @param {*} metaInfo 
     */

  }, {
    key: "locationMetaInfo",
    value: function locationMetaInfo(metaInfo) {
      var box = metaInfo.getBBox();

      if (box) {
        var corner1 = _leaflet["default"].latLng(box[1], box[0]);

        var corner2 = _leaflet["default"].latLng(box[3], box[2]);

        var bounds = _leaflet["default"].latLngBounds(corner1, corner2);

        this.getMap().fitBounds(bounds, {
          padding: [100, 100]
        });
      }
    }
    /**
     * 定位几何元素
     * @param {*} geometry 
     */

  }, {
    key: "locationGeometry",
    value: function locationGeometry(geometry) {
      var box = (0, _bbox["default"])(geometry);

      var corner1 = _leaflet["default"].latLng(box[1], box[0]);

      var corner2 = _leaflet["default"].latLng(box[3], box[2]);

      var bounds = _leaflet["default"].latLngBounds(corner1, corner2);

      this.getMap().fitBounds(bounds, {
        padding: [100, 100]
      });
    }
  }, {
    key: "locationServiceInfo",
    value: function locationServiceInfo(serviceInfo) {
      var layers = serviceInfo.layers;
      var geometry = null;

      for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var source = layer.source;
        var g = JSON.parse(source.extent);
        var tempGeometry = g;

        if (!g.geometry) {
          tempGeometry = turf.feature(g);
        }

        if (i > 0) {
          tempGeometry = turf.union(geometry, tempGeometry);
        }

        geometry = tempGeometry;
      }

      if (geometry != null) {
        var box = (0, _bbox["default"])(geometry);

        var corner1 = _leaflet["default"].latLng(box[1], box[0]);

        var corner2 = _leaflet["default"].latLng(box[3], box[2]);

        var bounds = _leaflet["default"].latLngBounds(corner1, corner2);

        this.getMap().fitBounds(bounds, {
          padding: [100, 100],
          linear: true
        });
      }
    }
  }, {
    key: "locationLayer",
    value: function locationLayer(layer) {
      var geometry = null;
      var source = layer.source;
      geometry = JSON.parse(source.extent);

      if (geometry != null) {
        var box = (0, _bbox["default"])(geometry);

        var corner1 = _leaflet["default"].latLng(box[1], box[0]);

        var corner2 = _leaflet["default"].latLng(box[3], box[2]);

        var bounds = _leaflet["default"].latLngBounds(corner1, corner2);

        this.getMap().fitBounds(bounds, {
          padding: [100, 100],
          linear: true
        });
      }
    } // 根据经纬度 点定位

  }, {
    key: "locationPoint",
    value: function locationPoint(point, zoom) {
      if (Array.isArray(point)) {
        this.getMap().setView(point, zoom);
      }
    }
    /**
     * @name: 标点
     * @msg: 
     * @param {type} point:[],title:标记名称
     * @return: 
     */

  }]);

  return LeafletMap;
}(_GxMap2["default"]);

var _default = LeafletMap;
exports["default"] = _default;