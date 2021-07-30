"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var locale = d3.timeFormatLocale({
  dateTime: "%a %b %e %X %Y",
  date: "%Y/%-m/%-d",
  time: "%H:%M:%S",
  periods: ["上午", "下午"],
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  shortMonths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
});
var formatMillisecond = locale.format(".%L"),
    formatSecond = locale.format(":%S"),
    formatMinute = locale.format("%I:%M"),
    formatHour = locale.format("%I %p"),
    formatDay = locale.format("%d"),
    // formatWeek = locale.format("%b %d"),
formatMonth = locale.format("%B"),
    formatYear = locale.format("%Y");

var multiFormat = function multiFormat(date) {
  return (d3.timeSecond(date) < date ? formatMillisecond : d3.timeMinute(date) < date ? formatSecond : d3.timeHour(date) < date ? formatMinute : d3.timeDay(date) < date ? formatHour : d3.timeMonth(date) < date ? formatDay : d3.timeYear(date) < date ? formatMonth : formatYear)(date);
};

var groupWidth = 0;
var groupHeight = 45;
var margin = {
  top: 0,
  right: 0,
  bottom: 25,
  left: 0
};
var elementWidth = 0;
var elementHeight = 0;

var TimelineChart = /*#__PURE__*/function () {
  function TimelineChart(element, clickPoint) {
    var _this = this;

    _classCallCheck(this, TimelineChart);

    _defineProperty(this, "withCustom", function (defaultClass) {
      return function (d) {
        return d.customClass ? [d.customClass, defaultClass].join(' ') : defaultClass;
      };
    });

    _defineProperty(this, "zoomed", function () {
      if (!d3.event || !d3.event.transform) {
        return;
      }

      _this.t = d3.event.transform.rescaleX(_this.x);

      _this.svg.select('.x.axis').call(_this.xAxis.scale(_this.t));

      _this.svg.selectAll('circle.dot').attr('cx', function (d) {
        return _this.t(d.at);
      });

      _this.svg.selectAll('text.dot').attr('x', function (d) {
        return _this.t(d.at);
      });

      _this.svg.selectAll('line.dot').attr('x1', function (d) {
        return _this.t(d.at);
      }).attr('x2', function (d) {
        return _this.t(d.at);
      });
    });

    this.element = element;
    this.clickPoint = clickPoint;
    this.options = this.extendOptions();
    this.init();
  }

  _createClass(TimelineChart, [{
    key: "extendOptions",
    value: function extendOptions() {
      var ext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultOptions = {
        intervalMinWidth: 8,
        // px
        tip: undefined,
        textTruncateThreshold: 30,
        enableLiveTimer: false,
        timerTickInterval: 1000,
        hideGroupLabels: false
      };
      Object.keys(ext).map(function (k) {
        return defaultOptions[k] = ext[k];
      });
      return defaultOptions;
    }
  }, {
    key: "updateData",
    value: function updateData(data) {
      var _this2 = this;

      this.svg.selectAll('.group-dot-item').data([]).exit().remove();

      if (this.dots || this.dots1) {
        this.dots.remove();
        this.dots1.remove();
      }

      this.groupDotItems = this.svg.selectAll('.group-dot-item').data(data).enter().append('g').attr('clip-path', 'url(#chart-content)').attr('class', 'item').attr('transform', function (d, i) {
        return "translate(0, ".concat(groupHeight * i, ")");
      }).selectAll('.dot').data(function (d) {
        return d.data.filter(function (_) {
          return _.type === TimelineChart.TYPE.POINT;
        });
      }).enter();
      var xOrt = this.x;

      if (this.t) {
        xOrt = this.t;
      }

      var defColor = "#606060";
      var selColor = "#f5222d";
      this.circle = this.groupDotItems.append('circle').attr('class', this.withCustom('dot')).style("fill", function (d) {
        if (d.isSelect) {
          return selColor;
        }

        return defColor;
      }).attr('cx', function (d) {
        return xOrt(d.at);
      }).attr('cy', groupHeight / 2 + 5).attr('r', 7).on('click', function (d) {
        return _this2.clickPoint(d);
      });
      this.text = this.groupDotItems.append("text").attr('class', this.withCustom('dot')).style("fill", function (d) {
        if (d.isSelect) {
          return selColor;
        }

        return defColor;
      }).attr('x', function (d) {
        return xOrt(d.at);
      }).attr('y', groupHeight / 2 - 3).attr("text-anchor", "middle").text(function (d) {
        if (d.metaInfo) {
          return d.metaInfo.name;
        }

        return;
      }).on('click', function (d) {
        return _this2.clickPoint(d);
      });
      this.line = this.groupDotItems.append('line').attr('class', this.withCustom('dot')).style("stroke", function (d) {
        if (d.isSelect) {
          return selColor;
        }

        return defColor;
      }).attr('x1', function (d) {
        return xOrt(d.at);
      }).attr('x2', function (d) {
        return xOrt(d.at);
      }).attr('y1', groupHeight / 2 + 10).attr('y2', groupHeight);
      this.zoomed();
    }
  }, {
    key: "updateXAxis",
    value: function updateXAxis(data, minDt, maxDt) {
      var xOrt = this.x;

      if (this.t) {
        xOrt = this.t;
      }

      if (!minDt && !maxDt) {
        minDt = xOrt.invert(0);
        maxDt = xOrt.invert(elementWidth);
      }

      this.createAxis(minDt, maxDt);
      this.updateData(data);
    }
  }, {
    key: "createAxis",
    value: function createAxis(minDt, maxDt) {
      elementWidth = this.element.clientWidth;
      elementHeight = this.element.clientHeight;
      var width = elementWidth - margin.left - margin.right;
      var height = elementHeight - margin.top - margin.bottom;
      this.x = d3.scaleTime().domain([minDt, maxDt]).range([groupWidth, width]);
      this.xAxis = d3.axisBottom(this.x).tickFormat(multiFormat);
      this.zoom = d3.zoom().on('zoom', this.zoomed);

      if (this.svg) {
        this.svg.remove();
      }

      if (this.g) {
        this.g.remove();
      }

      if (this.rect) {
        this.rect.remove();
      }

      if (this.axis) {
        this.axis.remove();
      }

      if (this.groupSection) {
        this.groupSection.remove();
      }

      this.svg = d3.select(this.element).append('svg').attr('width', elementWidth).attr('height', elementHeight);
      this.g = this.svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').call(this.zoom);
      this.rect = this.g.append('rect').attr('class', 'chart-bounds').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth); //刻度

      this.axis = this.g.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(this.xAxis); //横长轴

      this.groupSection = this.g.append('line').attr('class', 'group-section').attr('x1', 0).attr('x2', width).attr('y1', groupHeight - 1).attr('y2', groupHeight);
    }
  }, {
    key: "init",
    value: function init() {
      this.element.classList.add('timeline-chart');
      var minDt = new Date(2019, 0, 1);
      var maxDt = new Date();
      this.createAxis(minDt, maxDt);
      this.zoomed();
    }
  }]);

  return TimelineChart;
}();

TimelineChart.TYPE = {
  POINT: Symbol(),
  INTERVAL: Symbol()
};
var _default = TimelineChart;
exports["default"] = _default;