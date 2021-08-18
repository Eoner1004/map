"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MapControl = _interopRequireDefault(require("../components/Map/MapControl"));

var _BaseMapLayer = _interopRequireDefault(require("../components/Map/layer/BaseMapLayer"));

var _UrlLayer = _interopRequireDefault(require("../components/Map/layer/UrlLayer"));

var _FeatureLayer = _interopRequireDefault(require("../components/Map/layer/FeatureLayer"));

var _MetaLayer = _interopRequireDefault(require("../components/Map/layer/MetaLayer"));

var _ServiceLayer = _interopRequireDefault(require("../components/Map/layer/ServiceLayer"));

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _MetaInfo = _interopRequireDefault(require("../components/Map/MetaInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CommonMap = /*#__PURE__*/function (_Component) {
  _inherits(CommonMap, _Component);

  var _super = _createSuper(CommonMap);

  function CommonMap(props) {
    var _this;

    _classCallCheck(this, CommonMap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "setData", function (data) {
      if (data) {
        var newMataList = _toConsumableArray(_this.state.metaList);

        newMataList.push(data.obj);
        var metaList_pro = newMataList.map(function (it) {
          return _objectSpread(_objectSpread({}, it), {}, {
            datamgUrl: _this.props.datamgUrl
          });
        });

        _this.setState({
          metaList: metaList_pro
        }, function () {
          var gxMap = _this.state.gxMap;

          if (data.obj.checkStatus !== 2) {
            return message.warning('矢量正在上传队列中，请稍候刷新再试');
          } else {
            if (!data.obj.geometry) {
              // message.warning('无位置信息')
              var attributes = _lodash["default"].get(data, 'obj.attributes', []);

              var centerData = attributes.find(function (it) {
                return it.field.name === 'centerPoint';
              });
              var centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : [];

              if (centerPoint.length && gxMap) {
                var zoomData = attributes.find(function (it) {
                  return it.field.name === 'zoom';
                });
                var zoom = zoomData && zoomData.value ? zoomData.value : 10;
                var point = [centerPoint[1], centerPoint[0]];
                gxMap.locationPoint(point, zoom);
              } else {
                message.warning('无位置信息');
              }
            }

            setTimeout(function () {
              if (gxMap) {
                var metinfo = Object.assign(new _MetaInfo["default"](), data);
                gxMap.locationMetaInfo(metinfo);
                gxMap.resize();
              }
            }, 220);
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMapload", function (gxMap) {
      _this.setState({
        gxMap: gxMap
      });

      if (_this.props.onMapload) {
        _this.props.onMapload(gxMap);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onQueryFeature", function (geometry) {
      var metaList = _this.state.metaList;
      var metaIds = metaList ? metaList.map(function (item) {
        return item.id;
      }) : null;

      if (metaIds && metaIds.length) {
        _pubsubJs["default"].publish('queryFeature', {
          type: 'meta',
          geometry: geometry,
          metaIds: metaIds
        });
      } else if (_this.props.serviceItem) {
        _pubsubJs["default"].publish('queryFeature', {
          type: 'ser',
          geometry: geometry,
          serviceItem: _this.props.serviceItem
        });
      } // this.props.dispatch({
      //     type: 'feature/featureQuery',
      //     geometry: geometry,
      //     // serviceId: this.props.serviceId,
      //     serviceItem: this.props.serviceItem,
      //     metaIds: metaIds
      // })

    });

    var baseLayerMetaInfo = _this.getBaseMapMetaInfo();

    _this.state = {
      gxMap: null,
      metaList: [],
      baseLayerMetaInfo: baseLayerMetaInfo,
      geometrys: []
    };
    CommonMap.setData = _this.setData.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CommonMap, [{
    key: "getBaseMapMetaInfo",
    value: function getBaseMapMetaInfo() {
      var baseMap = localStorage.getItem('baseMap') || '';

      if (baseMap) {
        var item = JSON.parse(baseMap);
        var metainfo = Object.assign(new _MetaInfo["default"](), item);
        return metainfo;
      }

      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      //订阅树的点击事件
      this.pubsub_metaclick = _pubsubJs["default"].subscribe('onRelatedClick', function (topic, item) {
        var _this2 = this;

        var newMataList = !this.state.metaList ? [] : _toConsumableArray(this.state.metaList);
        var index = newMataList.findIndex(function (it) {
          return it.id === item.id;
        });

        if (index > -1) {
          newMataList.splice(index, 1);
        } else {
          newMataList.push(item.obj);
        }

        var metaList_pro = newMataList.map(function (it) {
          return _objectSpread(_objectSpread({}, it), {}, {
            datamgUrl: _this2.props.datamgUrl
          });
        });
        this.setState({
          metaList: metaList_pro
        }, function () {
          var gxMap = _this2.state.gxMap;

          if (item.obj.checkStatus !== 2) {
            return message.warning('矢量正在上传队列中，请稍候刷新再试');
          } else {
            if (!item.obj.geometry) {
              // message.warning('无位置信息')
              var attributes = _lodash["default"].get(item, 'obj.attributes', []);

              var centerData = attributes.find(function (it) {
                return it.field.name === 'centerPoint';
              });
              var centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : [];

              if (centerPoint.length && gxMap) {
                var zoomData = attributes.find(function (it) {
                  return it.field.name === 'zoom';
                });
                var zoom = zoomData && zoomData.value ? zoomData.value : 10;
                var point = [centerPoint[1], centerPoint[0]];
                gxMap.locationPoint(point, zoom);
              } else {
                message.warning('无位置信息');
              }
            }

            setTimeout(function () {
              if (gxMap) {
                var metinfo = Object.assign(new _MetaInfo["default"](), item);
                gxMap.locationMetaInfo(metinfo);
                gxMap.resize();
              }
            }, 220);
          }
        });
      }.bind(this)); //订阅选中列表的关闭事件

      this.pubsub_metaclose = _pubsubJs["default"].subscribe('closeSelect', function (topic, item) {
        if (!item) {
          _this3.setState({
            metaList: null
          });
        } else {
          var newMetaList = !_this3.state.metaList ? [] : _toConsumableArray(_this3.state.metaList);
          var index = newMetaList.findIndex(function (it) {
            return it.id === item.obj.id;
          });

          if (index > -1) {
            newMetaList.splice(index, 1);
          } else {
            newMetaList.push(item.obj);
            newMetaList = newMetaList.map(function (it) {
              return _objectSpread(_objectSpread({}, it), {}, {
                datamgUrl: _this3.props.datamgUrl
              });
            });
          }

          _this3.setState({
            metaList: newMetaList
          });
        }
      }); //订阅底图切换事件

      this.pubsub_basemapchange = _pubsubJs["default"].subscribe('changeBaseMap', function (topic, baseLayerMetaInfo) {
        _this3.setState({
          baseLayerMetaInfo: baseLayerMetaInfo
        });
      }); //订阅高亮要素geometry消息

      this.pubsub_featuregeometry = _pubsubJs["default"].subscribe('featureGeometry', function (topic, geometrys) {
        _this3.setState({
          geometrys: geometrys
        });
      }); //订阅服务

      this.pubsub_serviceitem = _pubsubJs["default"].subscribe('setServiceItem', function (topic, serviceItem) {
        console.log(serviceItem, 111);

        _this3.setState({
          serviceItem: serviceItem
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _pubsubJs["default"].unsubscribe(this.pubsub_metaclick);

      _pubsubJs["default"].unsubscribe(this.pubsub_metaclose);

      _pubsubJs["default"].unsubscribe(this.pubsub_basemapchange);

      _pubsubJs["default"].unsubscribe(this.pubsub_featuregeometry);

      _pubsubJs["default"].unsubscribe(this.pubsub_serviceitem);
    }
  }, {
    key: "render",
    value: function render() {
      var baseLayerMetaInfo = this.state.baseLayerMetaInfo;
      var serviceType = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceType') : "";
      var serviceUrl = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceUrl') : "";
      var _this$props = this.props,
          mapId = _this$props.mapId,
          url = _this$props.url;
      var _this$state = this.state,
          gxMap = _this$state.gxMap,
          metaList = _this$state.metaList,
          geometrys = _this$state.geometrys,
          serviceItem = _this$state.serviceItem;
      return /*#__PURE__*/_react["default"].createElement(_MapControl["default"], {
        mapId: mapId || 'servicemap',
        onLoad: this.onMapload,
        onQueryFeature: this.onQueryFeature
      }, /*#__PURE__*/_react["default"].createElement(_BaseMapLayer["default"], {
        serviceType: serviceType.value,
        serviceUrl: serviceUrl.value
      }), gxMap && url && /*#__PURE__*/_react["default"].createElement(_UrlLayer["default"], {
        url: url
      }), gxMap && metaList && metaList.map(function (metaInfo, index) {
        return /*#__PURE__*/_react["default"].createElement(_MetaLayer["default"], {
          key: metaInfo.id,
          metaInfo: metaInfo,
          layerIndex: metaInfo.layerIndex || index
        });
      }), gxMap && geometrys && geometrys.length > 0 && /*#__PURE__*/_react["default"].createElement(_FeatureLayer["default"], {
        features: geometrys
      }), gxMap && serviceItem && /*#__PURE__*/_react["default"].createElement(_ServiceLayer["default"], {
        serviceItem: serviceItem
      }));
    }
  }]);

  return CommonMap;
}(_react.Component);

var _default = CommonMap;
exports["default"] = _default;