"use strict";

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_leaflet["default"].Control.MousePosition = _leaflet["default"].Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: '',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },
  onAdd: function onAdd(map) {
    this._container = _leaflet["default"].DomUtil.create('div', 'leaflet-control-mouseposition');

    _leaflet["default"].DomEvent.disableClickPropagation(this._container);

    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
  },
  onRemove: function onRemove(map) {
    map.off('mousemove', this._onMouseMove);
  },
  _onMouseMove: function _onMouseMove(e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : _leaflet["default"].Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : _leaflet["default"].Util.formatNum(e.latlng.lat, this.options.numDigits);
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }
});

_leaflet["default"].Map.mergeOptions({
  positionControl: false
});

_leaflet["default"].Map.addInitHook(function () {
  if (this.options.positionControl) {
    this.positionControl = new _leaflet["default"].Control.MousePosition();
    this.addControl(this.positionControl);
  }
});

_leaflet["default"].control.mousePosition = function (options) {
  return new _leaflet["default"].Control.MousePosition(options);
};