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

var _timelineChart = _interopRequireDefault(require("./timelineChart"));

require("./timeline-chart.css");

var _moment = _interopRequireDefault(require("moment"));

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

var TimeSeriesMap = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TimeSeriesMap, _React$PureComponent);

  var _super = _createSuper(TimeSeriesMap);

  function TimeSeriesMap(props) {
    var _this;

    _classCallCheck(this, TimeSeriesMap);

    _this = _super.call(this, props);

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

      var showData = _this.props.showData;

      if (showData) {
        var geometry = JSON.parse(showData.geometry);

        if (geometry) {
          _this.state.gxMap.locationGeometry(geometry);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initD3", function (ele) {
      if (ele) {
        var timeline = new _timelineChart["default"](ele, _this.clickPoint);

        _this.setState({
          timeline: timeline
        }, function () {
          // window.onresize = () => {
          var metaList = _this.props.metaList; // let selectTimeItem = metaList[0]
          // timeline.updateXAxis(this.getData(metaList, selectTimeItem))

          if (metaList) {
            var time = _this.getTime(metaList);

            if (_this.state.timeline && time) {
              _this.state.timeline.updateXAxis(_this.getData(metaList), time.minDt, time.maxDt);

              _this.state.timeline.updateData(_this.getData(metaList, null));
            } // }

          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickPoint", function (e) {
      var data = e.target.__data__;
      var metaList = _this.props.metaList;

      _this.setState({
        selectTimeItem: data.metaInfo
      });

      if (_this.state.timeline) {
        _this.state.timeline.updateData(_this.getData(metaList, data.metaInfo));
      }
    });

    _this.state = {
      gxMap: null,
      timeline: null,
      selectTimeItem: null
    };
    return _this;
  }

  _createClass(TimeSeriesMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var time = this.getTime([]);

      if (this.state.timeline && time) {
        this.state.timeline.updateXAxis([], time.minDt, time.maxDt);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.onresize = null;
    }
  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      event.persist();
      event.preventDefault();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // if(this.props.metaList.length!==nextProps.metaList.length){
      var metaList = nextProps.metaList;

      if (metaList) {
        var time = this.getTime(metaList);

        if (this.state.timeline && time) {
          this.state.timeline.updateXAxis(this.getData(metaList), time.minDt, time.maxDt);
          this.state.timeline.updateData(this.getData(metaList, null));
        } // }

      }
    }
  }, {
    key: "getTime",
    value: function getTime(list) {
      var minDt = new Date(2019, 0, 1);
      var maxDt = new Date();
      list.forEach(function (it, i) {
        if (i === 0) {
          minDt = new Date(Number(Number((0, _moment["default"])(it.productTime).unix())) - 1000 * 3600 * 24);
        }

        maxDt = new Date(Number(Number((0, _moment["default"])(it.productTime).unix())) + 1000 * 3600 * 24);
      });
      return {
        minDt: minDt,
        maxDt: maxDt
      };
    }
  }, {
    key: "getData",
    value: function getData(metaList, clickItem) {
      var data = [];

      if (metaList) {
        data = [{
          data: metaList.map(function (it) {
            return {
              type: _timelineChart["default"].TYPE.POINT,
              at: new Date(Number((0, _moment["default"])(it.productTime).unix())),
              metaInfo: it,
              isSelect: clickItem && it.id === clickItem.id
            };
          })
        }];
      }

      return data;
    }
  }, {
    key: "render",
    value: function render() {
      var serviceType = this.props.serviceType;
      var serviceUrl = this.props.serviceUrl;
      var mapId = this.props.mapId;
      var selectTimeItem = this.state.selectTimeItem;
      var obj = {
        zoomNotShow: true,
        notShowZoomslider: true
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "brace-up",
        style: {
          height: '100%'
        },
        onDrop: this.onDrop.bind(this),
        onDragOver: this.onDragOver.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_MapControl["default"], {
        mapId: mapId,
        obj: obj,
        onLoad: this.onMapload
      }, serviceType && serviceUrl && /*#__PURE__*/_react["default"].createElement(_BaseMapLayer["default"], {
        serviceType: serviceType,
        serviceUrl: serviceUrl
      }), selectTimeItem && /*#__PURE__*/_react["default"].createElement(_UrlLayer["default"], {
        key: selectTimeItem.id,
        url: selectTimeItem.url
      })), /*#__PURE__*/_react["default"].createElement("div", {
        id: "d3svg",
        ref: this.initD3,
        style: {
          height: '70px',
          position: 'absolute',
          left: '8px',
          bottom: '25px',
          right: '8px',
          zIndex: 1100,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '3px'
        }
      }));
    }
  }]);

  return TimeSeriesMap;
}(_react["default"].PureComponent); // export default connect(state => ({
//     mapData: state.mapData,
// }))(TimeSeriesMap)


var _default = TimeSeriesMap;
exports["default"] = _default;