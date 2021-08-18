"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _centroid = _interopRequireDefault(require("@turf/centroid"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MetaInfo = /*#__PURE__*/function () {
  function MetaInfo() {
    _classCallCheck(this, MetaInfo);

    ///属性
    this.attributes = [];
    this.tempAttributes = {};
  }

  _createClass(MetaInfo, [{
    key: "getAttribute",
    value: function getAttribute(name) {
      if (this.tempAttributes[name]) {
        return this.tempAttributes[name];
      }

      if (this.attributes) {
        var result = this.attributes.filter(function (data) {
          return data.field.name === name;
        });

        if (result.length > 0) {
          this.tempAttributes[name] = result[0];
          return result[0];
        }
      }

      return {};
    }
    /**
     * 获取中心经纬度
     */

  }, {
    key: "getCenterLatLng",
    value: function getCenterLatLng() {
      if (this.center) {
        return this.center;
      }

      var geometry = JSON.parse(this.obj.geometry);
      this.center = (0, _centroid["default"])(geometry);
      return this.center;
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      if (this.box) {
        return this.box;
      }

      try {
        if (this.obj.geometry) {
          var geometry = JSON.parse(this.obj.geometry);
          this.box = (0, _bbox["default"])(geometry);
          return this.box;
        }
      } catch (err) {}

      return null;
    }
  }, {
    key: "getGeoJson",
    value: function getGeoJson() {
      if (this.geojson) {
        return this.geojson;
      }

      this.geojson = {
        "type": "Feature",
        "properties": {
          "name": this.name,
          "id": this.id,
          "acquireTime": this.obj.acquireTime,
          "imgType": this.obj.imgType
        },
        "geometry": JSON.parse(this.obj.geometry)
      };
      return this.geojson;
    }
  }]);

  return MetaInfo;
}();

var _default = MetaInfo;
exports["default"] = _default;