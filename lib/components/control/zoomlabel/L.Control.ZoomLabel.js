"use strict";

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_leaflet["default"].Control.ZoomLabel = _leaflet["default"].Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function onAdd(map) {
    this._container = _leaflet["default"].DomUtil.create('div', 'leaflet-control-zoomlabel');

    _leaflet["default"].DomEvent.disableClickPropagation(this._container);

    map.on('zoomend', this._onZoomend, this);
    this._container.innerHTML = map.getZoom();
    return this._container;
  },
  onRemove: function onRemove(map) {
    map.off('zoomend', this._onZoomend);
  },
  _onZoomend: function _onZoomend(e) {
    this._container.innerHTML = e.target._zoom;
  }
});

_leaflet["default"].control.zoomLabel = function (options) {
  return new _leaflet["default"].Control.ZoomLabel(options);
};