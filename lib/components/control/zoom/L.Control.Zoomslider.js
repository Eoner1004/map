"use strict";

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_leaflet["default"].Control.Zoomslider = function () {
  var Knob = _leaflet["default"].Draggable.extend({
    initialize: function initialize(element, stepHeight, knobHeight) {
      _leaflet["default"].Draggable.prototype.initialize.call(this, element, element);

      this._element = element;
      this._stepHeight = stepHeight;
      this._knobHeight = knobHeight;
      this.on('predrag', function () {
        this._newPos.x = 0;
        this._newPos.y = this._adjust(this._newPos.y);
      }, this);
    },
    _adjust: function _adjust(y) {
      var value = Math.round(this._toValue(y));
      value = Math.max(0, Math.min(this._maxValue, value));
      return this._toY(value);
    },
    // y = k*v + m
    _toY: function _toY(value) {
      return this._k * value + this._m;
    },
    // v = (y - m) / k
    _toValue: function _toValue(y) {
      return (y - this._m) / this._k;
    },
    setSteps: function setSteps(steps) {
      var sliderHeight = steps * this._stepHeight;
      this._maxValue = steps - 1; // conversion parameters
      // the conversion is just a common linear function.

      this._k = -this._stepHeight;
      this._m = sliderHeight - (this._stepHeight + this._knobHeight) / 2;
    },
    setPosition: function setPosition(y) {
      _leaflet["default"].DomUtil.setPosition(this._element, _leaflet["default"].point(0, this._adjust(y)));
    },
    setValue: function setValue(v) {
      this.setPosition(this._toY(v));
    },
    getValue: function getValue() {
      return this._toValue(_leaflet["default"].DomUtil.getPosition(this._element).y);
    }
  });

  var Zoomslider = _leaflet["default"].Control.extend({
    options: {
      position: 'topleft',
      // Height of zoom-slider.png in px
      stepHeight: 8,
      // Height of the knob div in px (including border)
      knobHeight: 6,
      styleNS: 'leaflet-control-zoomslider'
    },
    onAdd: function onAdd(map) {
      this._map = map;
      this._ui = this._createUI();
      this._knob = new Knob(this._ui.knob, this.options.stepHeight, this.options.knobHeight);
      map.whenReady(this._initKnob, this).whenReady(this._initEvents, this).whenReady(this._updateSize, this).whenReady(this._updateKnobValue, this).whenReady(this._updateDisabled, this);
      return this._ui.bar;
    },
    onRemove: function onRemove(map) {
      map.off('zoomlevelschange', this._updateSize, this).off('zoomend zoomlevelschange', this._updateKnobValue, this).off('zoomend zoomlevelschange', this._updateDisabled, this);
    },
    _createUI: function _createUI() {
      var ui = {};
      var ns = this.options.styleNS;
      ui.bar = _leaflet["default"].DomUtil.create('div', ns + ' leaflet-bar');
      ui.zoomIn = this._createZoomBtn('in', 'top', ui.bar);
      ui.wrap = _leaflet["default"].DomUtil.create('div', ns + '-wrap leaflet-bar-part', ui.bar);
      ui.zoomOut = this._createZoomBtn('out', 'bottom', ui.bar);
      ui.body = _leaflet["default"].DomUtil.create('div', ns + '-body', ui.wrap);
      ui.knob = _leaflet["default"].DomUtil.create('div', ns + '-knob');

      _leaflet["default"].DomEvent.disableClickPropagation(ui.bar);

      _leaflet["default"].DomEvent.disableClickPropagation(ui.knob);

      return ui;
    },
    _createZoomBtn: function _createZoomBtn(zoomDir, end, container) {
      var classDef = this.options.styleNS + '-' + zoomDir + ' leaflet-bar-part' + ' leaflet-bar-part-' + end,
          link = _leaflet["default"].DomUtil.create('a', classDef, container);

      link.href = '#';
      link.title = 'Zoom ' + zoomDir;

      _leaflet["default"].DomEvent.on(link, 'click', _leaflet["default"].DomEvent.preventDefault);

      return link;
    },
    _initKnob: function _initKnob() {
      this._knob.enable();

      this._ui.body.appendChild(this._ui.knob);
    },
    _initEvents: function _initEvents(map) {
      this._map.on('zoomlevelschange', this._updateSize, this).on('zoomend zoomlevelschange', this._updateKnobValue, this).on('zoomend zoomlevelschange', this._updateDisabled, this);

      _leaflet["default"].DomEvent.on(this._ui.body, 'click', this._onSliderClick, this);

      _leaflet["default"].DomEvent.on(this._ui.zoomIn, 'click', this._zoomIn, this);

      _leaflet["default"].DomEvent.on(this._ui.zoomOut, 'click', this._zoomOut, this);

      this._knob.on('dragend', this._updateMapZoom, this);
    },
    _onSliderClick: function _onSliderClick(e) {
      var first = e.touches && e.touches.length === 1 ? e.touches[0] : e,
          y = _leaflet["default"].DomEvent.getMousePosition(first, this._ui.body).y;

      this._knob.setPosition(y);

      this._updateMapZoom();
    },
    _zoomIn: function _zoomIn(e) {
      this._map.zoomIn(e.shiftKey ? 3 : 1);
    },
    _zoomOut: function _zoomOut(e) {
      this._map.zoomOut(e.shiftKey ? 3 : 1);
    },
    _zoomLevels: function _zoomLevels() {
      var zoomLevels = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
      return zoomLevels < Infinity ? zoomLevels : 0;
    },
    _toZoomLevel: function _toZoomLevel(value) {
      return value + this._map.getMinZoom();
    },
    _toValue: function _toValue(zoomLevel) {
      return zoomLevel - this._map.getMinZoom();
    },
    _updateSize: function _updateSize() {
      var steps = this._zoomLevels();

      this._ui.body.style.height = this.options.stepHeight * steps + 'px';

      this._knob.setSteps(steps);
    },
    _updateMapZoom: function _updateMapZoom() {
      this._map.setZoom(this._toZoomLevel(this._knob.getValue()));
    },
    _updateKnobValue: function _updateKnobValue() {
      this._knob.setValue(this._toValue(this._map.getZoom()));
    },
    _updateDisabled: function _updateDisabled() {
      var zoomLevel = this._map.getZoom(),
          className = this.options.styleNS + '-disabled';

      _leaflet["default"].DomUtil.removeClass(this._ui.zoomIn, className);

      _leaflet["default"].DomUtil.removeClass(this._ui.zoomOut, className);

      if (zoomLevel === this._map.getMinZoom()) {
        _leaflet["default"].DomUtil.addClass(this._ui.zoomOut, className);
      }

      if (zoomLevel === this._map.getMaxZoom()) {
        _leaflet["default"].DomUtil.addClass(this._ui.zoomIn, className);
      }
    }
  });

  return Zoomslider;
}();

_leaflet["default"].Map.mergeOptions({
  zoomControl: false,
  zoomsliderControl: true
});

_leaflet["default"].control.zoomslider = function (options) {
  return new _leaflet["default"].Control.Zoomslider(options);
};