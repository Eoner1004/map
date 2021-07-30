"use strict";

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SideBySideFn = function SideBySideFn() {
  var mapWasDragEnabled;
  var mapWasTapEnabled; // Leaflet v0.7 backwards compatibility

  function on(el, types, fn, context) {
    types.split(' ').forEach(function (type) {
      _leaflet["default"].DomEvent.on(el, type, fn, context);
    });
  } // Leaflet v0.7 backwards compatibility


  function off(el, types, fn, context) {
    types.split(' ').forEach(function (type) {
      _leaflet["default"].DomEvent.off(el, type, fn, context);
    });
  }

  function getRangeEvent(rangeInput) {
    return 'oninput' in rangeInput ? 'input' : 'change';
  }

  function cancelMapDrag() {
    mapWasDragEnabled = this._map.dragging.enabled();
    mapWasTapEnabled = this._map.tap && this._map.tap.enabled();

    this._map.dragging.disable();

    this._map.tap && this._map.tap.disable();
  }

  function uncancelMapDrag(e) {
    this._refocusOnMap(e);

    if (mapWasDragEnabled) {
      this._map.dragging.enable();
    }

    if (mapWasTapEnabled) {
      this._map.tap.enable();
    }
  } // convert arg to an array - returns empty array if arg is undefined


  function asArray(arg) {
    return arg === 'undefined' ? [] : Array.isArray(arg) ? arg : [arg];
  }

  function noop() {}

  _leaflet["default"].Control.SideBySide = _leaflet["default"].Control.extend({
    options: {
      thumbSize: 42,
      padding: 0
    },
    initialize: function initialize(leftLayers, rightLayers, options) {
      this.setLeftLayers(leftLayers);
      this.setRightLayers(rightLayers);

      _leaflet["default"].setOptions(this, options);
    },
    getPosition: function getPosition() {
      var rangeValue = this._range.value;
      var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize);
      return this._map.getSize().x * rangeValue + offset;
    },
    setPosition: noop,
    includes: _leaflet["default"].Evented.prototype || _leaflet["default"].Mixin.Events,
    addTo: function addTo(map) {
      this.remove();
      this._map = map;

      var container = this._container = _leaflet["default"].DomUtil.create('div', 'leaflet-sbs', map._controlContainer);

      this._divider = _leaflet["default"].DomUtil.create('div', 'leaflet-sbs-divider', container);

      var range = this._range = _leaflet["default"].DomUtil.create('input', 'leaflet-sbs-range', container);

      range.type = 'range';
      range.min = 0;
      range.max = 1;
      range.step = 'any';
      range.value = 0.5;
      range.style.paddingLeft = range.style.paddingRight = this.options.padding + 'px';

      this._addEvents();

      this._updateLayers();

      return this;
    },
    remove: function remove(map) {
      if (!this._map) {
        return this;
      }

      if (this._leftLayer) {
        this._leftLayer.getContainer().style.clip = '';
      }

      if (this._rightLayer) {
        this._rightLayer.getContainer().style.clip = '';
      }

      this._removeEvents();

      _leaflet["default"].DomUtil.remove(this._container);

      this._map = null;
      return this;
    },
    setLeftLayers: function setLeftLayers(leftLayers) {
      this._leftLayers = asArray(leftLayers);

      this._updateLayers();

      return this;
    },
    setRightLayers: function setRightLayers(rightLayers) {
      this._rightLayers = asArray(rightLayers);

      this._updateLayers();

      return this;
    },
    _updateClip: function _updateClip() {
      var map = this._map;
      var nw = map.containerPointToLayerPoint([0, 0]);
      var se = map.containerPointToLayerPoint(map.getSize());
      var clipX = nw.x + this.getPosition();
      var dividerX = this.getPosition();
      this._divider.style.left = dividerX + 'px';
      this.fire('dividermove', {
        x: dividerX
      });
      var clipLeft = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
      var clipRight = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';

      if (this._leftLayer) {
        this._leftLayer.getContainer().style.clip = clipLeft;
      }

      if (this._rightLayer) {
        this._rightLayer.getContainer().style.clip = clipRight;
      }
    },
    _updateLayers: function _updateLayers() {
      if (!this._map) {
        return this;
      }

      var prevLeft = this._leftLayer;
      var prevRight = this._rightLayer;
      this._leftLayer = this._rightLayer = null;

      this._leftLayers.forEach(function (layer) {
        if (this._map.hasLayer(layer)) {
          this._leftLayer = layer;
        }
      }, this);

      this._rightLayers.forEach(function (layer) {
        if (this._map.hasLayer(layer)) {
          this._rightLayer = layer;
        }
      }, this);

      if (prevLeft !== this._leftLayer) {
        prevLeft && this.fire('leftlayerremove', {
          layer: prevLeft
        });
        this._leftLayer && this.fire('leftlayeradd', {
          layer: this._leftLayer
        });
      }

      if (prevRight !== this._rightLayer) {
        prevRight && this.fire('rightlayerremove', {
          layer: prevRight
        });
        this._rightLayer && this.fire('rightlayeradd', {
          layer: this._rightLayer
        });
      }

      this._updateClip();
    },
    _addEvents: function _addEvents() {
      var range = this._range;
      var map = this._map;
      if (!map || !range) return;
      map.on('move', this._updateClip, this);
      map.on('layeradd layerremove', this._updateLayers, this);
      on(range, getRangeEvent(range), this._updateClip, this);
      on(range, _leaflet["default"].Browser.touch ? 'touchstart' : 'mousedown', cancelMapDrag, this);
      on(range, _leaflet["default"].Browser.touch ? 'touchend' : 'mouseup', uncancelMapDrag, this);
    },
    _removeEvents: function _removeEvents() {
      var range = this._range;
      var map = this._map;

      if (range) {
        off(range, getRangeEvent(range), this._updateClip, this);
        off(range, _leaflet["default"].Browser.touch ? 'touchstart' : 'mousedown', cancelMapDrag, this);
        off(range, _leaflet["default"].Browser.touch ? 'touchend' : 'mouseup', uncancelMapDrag, this);
      }

      if (map) {
        map.off('layeradd layerremove', this._updateLayers, this);
        map.off('move', this._updateClip, this);
      }
    }
  });

  _leaflet["default"].control.sideBySide = function (leftLayers, rightLayers, options) {
    return new _leaflet["default"].Control.SideBySide(leftLayers, rightLayers, options);
  }; // module.exports = L.Control.SideBySide

};

SideBySideFn();