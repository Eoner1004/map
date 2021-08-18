"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _antd = require("antd");

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

// import {LeftOutlined, RightOutlined} from '@ant-design/icons';
// import { divIcon } from 'leaflet';
// import { actService } from '../../../../plugin/mapEditTool/service/index'
var Panel = _antd.Collapse.Panel;
var attributeObjs = {
  img: '图片',
  massifNum: '地块编号',
  name: '名称'
};

var FeatureResult = /*#__PURE__*/function (_React$Component) {
  _inherits(FeatureResult, _React$Component);

  var _super = _createSuper(FeatureResult);

  function FeatureResult(props) {
    var _this;

    _classCallCheck(this, FeatureResult);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "showModalVersion", function (item) {
      _this.setState({
        selData: item
      }, function () {
        _this.queryFeaVersion();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancelVersion", function (e) {
      _this.setState({
        versionVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "queryFeaVersion", function () {
      var selData = _this.state.selData;
      var params = {
        "pageNum": 1,
        "pageSize": 1000,
        "classObjectId": selData.from,
        "oid": selData.id,
        "branchId": 1,
        "loadEvent": true,
        "loadVersion": true
      }; // actService.actQuery(params).then(res => {
      //     if (res.data.status === 200) {
      //         let data = res.data.data
      //         this.setState({
      //             visibleData: data,
      //             versionVisible: true,
      //         })
      //     }
      // })
    });

    _defineProperty(_assertThisInitialized(_this), "showModal", function (item) {
      var arr = [];

      if (item) {
        arr = item.value ? item.value.split(',') : [];
      }

      _this.setState({
        visible: true,
        itemPic: arr
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getValue", function (op) {
      var value = '';

      if (op === 1) {
        value = '添加';
      } else if (op === 2) {
        value = '删除';
      } else if (op === 4) {
        value = '更新';
      }

      return value;
    });

    _this.state = {
      visible: false,
      itemPic: [],
      current: 1,
      versionVisible: false,
      visibleData: null,
      selData: null
    };
    return _this;
  }

  _createClass(FeatureResult, [{
    key: "next",
    value: function next() {
      this.slider.slick.slickNext();
    }
  }, {
    key: "prev",
    value: function prev() {
      this.slider.slick.slickPrev();
    }
  }, {
    key: "nowIndex",
    value: function nowIndex(e) {
      this.setState({
        current: e + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var list = this.props.list;
      var that = this;
      var versionVisible = this.state.versionVisible;
      var visibleData = this.state.visibleData;
      var visibleList = []; // let total = 0

      if (visibleData) {
        visibleList = visibleData.items; // total = visibleData.totalItems
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_antd.Collapse, {
        accordion: true,
        bordered: false,
        defaultActiveKey: ['0']
      }, list && list.map(function (it, i) {
        var name = getAttributeName(it);
        var header = name ? name : i;
        var lists = [];

        for (var at in it.attributes) {
          var att = it.attributes[at];
          var obj = {
            name: attributeObjs[at] ? attributeObjs[at] : at,
            value: att
          };

          if (at === 'massifNum') {
            lists.unshift(obj);
          } else {
            lists.push(obj);
          }
        }

        return /*#__PURE__*/_react["default"].createElement(Panel, {
          header: header,
          key: i
        }, /*#__PURE__*/_react["default"].createElement(_antd.List, {
          bordered: true,
          dataSource: lists,
          renderItem: function renderItem(item) {
            return /*#__PURE__*/_react["default"].createElement(_antd.List.Item, {
              style: {
                margin: '0px',
                padding: '0px',
                width: '100%'
              }
            }, /*#__PURE__*/_react["default"].createElement(_antd.Row, null, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
              span: 8,
              style: {
                padding: '5px',
                fontSize: '14px',
                borderRight: '1px solid #3B5176',
                borderBottom: '1px solid #3B5176'
              }
            }, item.name), item.name === '图片' ? /*#__PURE__*/_react["default"].createElement(_antd.Col, {
              span: 16,
              style: {
                padding: '5px',
                fontSize: '14px',
                borderLeft: '1px solid #3B5176'
              }
            }, item.value ? /*#__PURE__*/_react["default"].createElement("span", {
              style: {
                cursor: 'pointer',
                color: '#3078db'
              },
              onClick: that.showModal.bind(_this2, item)
            }, "\u56FE\u7247\u67E5\u770B") : /*#__PURE__*/_react["default"].createElement("span", null, "\u6682\u65E0\u56FE\u7247")) : /*#__PURE__*/_react["default"].createElement(_antd.Col, {
              span: 16,
              style: {
                padding: '5px',
                fontSize: '14px',
                borderLeft: '1px solid #3B5176'
              }
            }, item.value)));
          }
        }));
      })), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        footer: null,
        closable: false,
        wrapClassName: "picture",
        visible: this.state.visible,
        onCancel: this.handleCancel,
        width: 620
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "model-title"
      }, this.state.current + '/' + this.state.itemPic.length), /*#__PURE__*/_react["default"].createElement(_antd.Carousel, {
        ref: function ref(el) {
          return _this2.slider = el;
        },
        className: "pic-carousel",
        afterChange: function afterChange(e) {
          _this2.nowIndex(e);
        }
      }, this.state.itemPic.map(function (it) {
        return /*#__PURE__*/_react["default"].createElement("img", {
          height: 690,
          src: _this2.props.imgUrl + '/' + it,
          alt: ""
        });
      })), this.state.itemPic.length > 1 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
        onClick: this.prev.bind(this),
        className: "icon",
        style: {
          left: 0
        },
        type: "left"
      }), /*#__PURE__*/_react["default"].createElement(_antd.Icon, {
        onClick: this.next.bind(this),
        className: "icon",
        style: {
          right: 0
        },
        type: "right"
      }))), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
        title: "\u53D8\u66F4\u96C6",
        closable: false,
        visible: versionVisible,
        onOk: this.handleCancelVersion,
        onCancel: this.handleCancelVersion,
        footer: [/*#__PURE__*/_react["default"].createElement(_antd.Button, {
          key: "back",
          onClick: this.handleCancelVersion
        }, "\u5173\u95ED")]
      }, /*#__PURE__*/_react["default"].createElement(_antd.List, {
        style: {
          maxHeight: 300,
          minHeight: 168,
          overflowY: 'auto',
          marginBottom: 10
        },
        bordered: true,
        dataSource: visibleList,
        renderItem: function renderItem(item) {
          return /*#__PURE__*/_react["default"].createElement(_antd.List.Item, {
            style: {
              margin: '0px',
              padding: '2px 10px',
              width: '100%',
              display: 'inline-block',
              lineHeight: '20px',
              color: 'rgba(0, 0, 0, 0.85)'
            }
          }, (0, _moment["default"])(Number(item.version.vTime)).format('YYYY-MM-DD HH:mm:ss'), " ", _this2.getValue(item.operation));
        }
      })));
    }
  }]);

  return FeatureResult;
}(_react["default"].Component);

exports["default"] = FeatureResult;

function getAttribute(item, name) {
  var attributes = item.attributes;

  for (var i in attributes) {
    var att = attributes[i];

    if (att && att.NAME === name) {
      return att;
    }
  } // let result = attributes.filter(data => data.key === name)
  // if (result.length > 0) {
  //     return result[0]
  // }


  return null;
}

function getAttributeName(item) {
  var name = getAttribute(item, 'name');
  var NAME = getAttribute(item, "NAME");

  if (name) {
    return name;
  } else if (NAME) {
    return NAME;
  }

  return null;
}