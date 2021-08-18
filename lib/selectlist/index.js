"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _MetaInfo = _interopRequireDefault(require("../components/Map/MetaInfo"));

var _pubsubJs = _interopRequireDefault(require("pubsub-js"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var SelectList = /*#__PURE__*/function (_React$Component) {
  _inherits(SelectList, _React$Component);

  var _super = _createSuper(SelectList);

  function SelectList(props) {
    var _this;

    _classCallCheck(this, SelectList);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getShow", function (notShowList, item) {
      var have = notShowList.find(function (it) {
        return it.id === item.id;
      });

      if (have) {
        return true;
      } else {
        return false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showEye", function (e, item) {
      e.preventDefault();
      e.stopPropagation();

      var newList = _toConsumableArray(_this.state.notShowList);

      var index = newList.findIndex(function (it) {
        return it.id === item.id;
      });

      if (index > -1) {
        newList.splice(index, 1);
      } else {
        newList.push(item);
      }

      _this.setState({
        notShowList: newList
      });

      _pubsubJs["default"].publish('closeSelect', item);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (item, i) {
      _this.setState({
        dragItemIndex: i
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragOver", function (item, i, event) {
      event.persist();
      event.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (item, i, event) {
      event.persist();
      event.stopPropagation(); //阻止冒泡

      var dragItemIndex = _this.state.dragItemIndex; // let selectList = this.props.dataSelectList.get('selectList') || []
      // let newList = [...selectList]
      // let data = selectList[dragItemIndex]
      // newList.splice(dragItemIndex, 1)
      // newList.splice(i, 0, { ...data })
      // this.props.dispatch({
      //     type: 'dataSelectList/setSelectList',
      //     selectList: [...newList]
      // })
      // this.props.dispatch({
      //     type: 'dataSelectList/notShowList',
      //     item: data
      // })
      // setTimeout(() => {
      //     this.props.dispatch({
      //         type: 'dataSelectList/notShowList',
      //         item: data
      //     })
      // }, 100);
    });

    _this.state = {
      clickCard: null,
      notShowList: [],
      dragItemIndex: null,
      //拖动数据
      selectList: []
    };
    return _this;
  }

  _createClass(SelectList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      this.pubsub_selectclick = _pubsubJs["default"].subscribe('onRelatedClick', function (topic, item) {
        var newSelctList = !that.state.selectList ? [] : _toConsumableArray(that.state.selectList);
        var index = newSelctList.findIndex(function (it) {
          return it.id === item.id;
        });

        if (index > -1) {
          newSelctList.splice(index, 1);
        } else {
          newSelctList.push(item);
        }

        var selectList_pro = newSelctList.map(function (it) {
          return _objectSpread(_objectSpread({}, it), {}, {
            datamgUrl: that.props.datamgUrl
          });
        });
        that.setState({
          selectList: selectList_pro
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _pubsubJs["default"].unsubscribe(this.pubsub_selectclick);
    }
  }, {
    key: "onClickCard",
    value: function onClickCard(item) {
      this.setState({
        clickCard: item
      });

      if (item.obj.checkStatus !== 2) {
        return _antd.message.warning('矢量正在上传队列中，请稍候刷新再试');
      } else {
        if (!item.obj.geometry) {
          // message.warning('无位置信息')
          var attributes = _lodash["default"].get(item, 'obj.attributes', []);

          var centerData = attributes.find(function (it) {
            return it.field.name === 'centerPoint';
          });
          var centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : [];

          if (centerPoint.length) {
            var zoomData = attributes.find(function (it) {
              return it.field.name === 'zoom';
            });
            var zoom = zoomData && zoomData.value ? zoomData.value : 10;
            var point = [centerPoint[1], centerPoint[0]];
            var gxMap = this.props.mapView.getGxMap();
            gxMap.locationPoint(point, zoom);
          } else {
            _antd.message.warning('无位置信息');
          }
        }

        if (this.props.onMetaLocation) {
          var metinfo = Object.assign(new _MetaInfo["default"](), item);
          this.props.onMetaLocation(metinfo);
        }
      }
    }
  }, {
    key: "clearSel",
    value: function clearSel(item, e) {
      e.preventDefault();
      e.stopPropagation();
      var _this$state = this.state,
          selectList = _this$state.selectList,
          notShowList = _this$state.notShowList;
      var newSelectList = selectList.filter(function (it) {
        return it.id !== item.id;
      });
      var newNotShowList = notShowList.filter(function (it) {
        return it.id !== item.id;
      });
      this.setState({
        selectList: newSelectList,
        notShowList: newNotShowList
      });

      _pubsubJs["default"].publish('closeSelect', item);
    }
  }, {
    key: "clearSelectModel",
    value: function clearSelectModel(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        selectList: null
      });

      _pubsubJs["default"].publish('closeSelect', null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // let selectList = this.props.dataSelectList.get('selectList')
      // let notShowList = this.props.dataSelectList.get('notShowList') || []
      var _this$state2 = this.state,
          selectList = _this$state2.selectList,
          notShowList = _this$state2.notShowList;
      var clickCard = this.state.clickCard;

      if (selectList && selectList.length) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "data-selete-list"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "title"
        }, "\u9009\u4E2D\u5217\u8868", /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
          type: "close",
          style: {
            fontSize: 16,
            transform: 'translate(-10px, 6px)'
          },
          onClick: this.clearSelectModel.bind(this)
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "list"
        }, selectList && /*#__PURE__*/_react["default"].createElement(_antd.List, {
          dataSource: selectList,
          renderItem: function renderItem(item, index) {
            return /*#__PURE__*/_react["default"].createElement(_antd.List.Item, {
              className: clickCard && clickCard.id === item.id ? 'selectItem' : ''
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "data-listitem cle",
              onClick: _this2.onClickCard.bind(_this2, item),
              draggable: true,
              onDrop: function onDrop(e) {
                return _this2.onDrop(item, index, e);
              },
              onDragOver: function onDragOver(e) {
                return _this2.onDragOver(item, index, e);
              },
              onDragStart: function onDragStart() {
                return _this2.onDragStart(item, index);
              }
            }, /*#__PURE__*/_react["default"].createElement("div", {
              style: {
                "float": 'left',
                paddingTop: "6px",
                paddingRight: '4px'
              }
            }, !_this2.getShow(notShowList, item) && /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
              type: "eye",
              style: {
                fontSize: '16px',
                color: '#1890ff'
              },
              onClick: function onClick(e) {
                return _this2.showEye(e, item);
              }
            }), _this2.getShow(notShowList, item) && /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
              type: "eye-invisible",
              style: {
                fontSize: '16px',
                color: '#ff4d4f'
              },
              onClick: function onClick(e) {
                return _this2.showEye(e, item);
              }
            })), /*#__PURE__*/_react["default"].createElement("div", {
              title: item.obj ? item.obj.name : '',
              style: {
                "float": 'left'
              }
            }, /*#__PURE__*/_react["default"].createElement("div", {
              className: "dot",
              style: {
                paddingLeft: 8,
                maxWidth: '120px',
                display: "inline-block",
                verticalAlign: 'top',
                paddingTop: "6px"
              }
            }, item.obj ? item.obj.name : '')), /*#__PURE__*/_react["default"].createElement("div", {
              style: {
                "float": 'right',
                paddingTop: "6px",
                paddingRight: "4px"
              }
            }, /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
              type: "minus-circle",
              style: {
                fontSize: 16,
                color: 'red'
              },
              onClick: _this2.clearSel.bind(_this2, item)
            }))));
          }
        })));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      }
    }
  }]);

  return SelectList;
}(_react["default"].Component);

var _default = SelectList;
exports["default"] = _default;