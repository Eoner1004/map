"use strict";

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Extends L.Map to synchronize the interaction on one map to one or more other maps.
 */
var leafletSyncFn = function leafletSyncFn() {
  var NO_ANIMATION = {
    animate: false,
    reset: true,
    disableViewprereset: true
  };

  _leaflet["default"].Sync = function () {};
  /*
   * Helper function to compute the offset easily.
   *
   * The arguments are relative positions with respect to reference and target maps of
   * the point to sync. If you provide ratioRef=[0, 1], ratioTarget=[1, 0] will sync the
   * bottom left corner of the reference map with the top right corner of the target map.
   * The values can be less than 0 or greater than 1. It will sync points out of the map.
   */


  _leaflet["default"].Sync.offsetHelper = function (ratioRef, ratioTarget) {
    var or = _leaflet["default"].Util.isArray(ratioRef) ? ratioRef : [0.5, 0.5];
    var ot = _leaflet["default"].Util.isArray(ratioTarget) ? ratioTarget : [0.5, 0.5];
    return function (center, zoom, refMap, targetMap) {
      var rs = refMap.getSize();
      var ts = targetMap.getSize();
      var pt = refMap.project(center, zoom).subtract([(0.5 - or[0]) * rs.x, (0.5 - or[1]) * rs.y]).add([(0.5 - ot[0]) * ts.x, (0.5 - ot[1]) * ts.y]);
      return refMap.unproject(pt, zoom);
    };
  };

  _leaflet["default"].Map.include({
    sync: function sync(map, options) {
      this._initSync();

      options = _leaflet["default"].extend({
        noInitialSync: false,
        syncCursor: false,
        syncCursorMarkerOptions: {
          radius: 10,
          fillOpacity: 0.3,
          color: '#da291c',
          fillColor: '#fff'
        },
        offsetFn: function offsetFn(center, zoom, refMap, targetMap) {
          // no transformation at all
          return center;
        }
      }, options); // prevent double-syncing the map:

      if (this._syncMaps.indexOf(map) === -1) {
        this._syncMaps.push(map);

        this._syncOffsetFns[_leaflet["default"].Util.stamp(map)] = options.offsetFn;
      }

      if (!options.noInitialSync) {
        map.setView(options.offsetFn(this.getCenter(), this.getZoom(), this, map), this.getZoom(), NO_ANIMATION);
      }

      if (options.syncCursor) {
        if (typeof map.cursor === 'undefined') {
          map.cursor = _leaflet["default"].circleMarker([0, 0], options.syncCursorMarkerOptions).addTo(map);
        }

        this._cursors.push(map.cursor);

        this.on('mousemove', this._cursorSyncMove, this);
        this.on('mouseout', this._cursorSyncOut, this);
      } // on these events, we should reset the view on every synced map
      // dragstart is due to inertia


      this.on('resize zoomend', this._selfSetView);
      this.on('moveend', this._syncOnMoveend);
      this.on('dragend', this._syncOnDragend);
      return this;
    },
    // unsync maps from each other
    unsync: function unsync(map) {
      var self = this;

      if (this._cursors) {
        this._cursors.forEach(function (cursor, indx, _cursors) {
          if (cursor === map.cursor) {
            _cursors.splice(indx, 1);
          }
        });
      } // TODO: hide cursor in stead of moving to 0, 0


      if (map.cursor) {
        map.cursor.setLatLng([0, 0]);
      }

      if (this._syncMaps) {
        this._syncMaps.forEach(function (synced, id) {
          if (map === synced) {
            delete self._syncOffsetFns[_leaflet["default"].Util.stamp(map)];

            self._syncMaps.splice(id, 1);
          }
        });
      }

      if (!this._syncMaps || this._syncMaps.length === 0) {
        // no more synced maps, so these events are not needed.
        this.off('resize zoomend', this._selfSetView);
        this.off('moveend', this._syncOnMoveend);
        this.off('dragend', this._syncOnDragend);
      }

      return this;
    },
    // Checks if the map is synced with anything or a specifyc map
    isSynced: function isSynced(otherMap) {
      var has = this.hasOwnProperty('_syncMaps') && Object.keys(this._syncMaps).length > 0;

      if (has && otherMap) {
        // Look for this specific map
        has = false;

        this._syncMaps.forEach(function (synced) {
          if (otherMap === synced) {
            has = true;
          }
        });
      }

      return has;
    },
    // Callbacks for events...
    _cursorSyncMove: function _cursorSyncMove(e) {
      this._cursors.forEach(function (cursor) {
        cursor.setLatLng(e.latlng);
      });
    },
    _cursorSyncOut: function _cursorSyncOut(e) {
      this._cursors.forEach(function (cursor) {
        // TODO: hide cursor in stead of moving to 0, 0
        cursor.setLatLng([0, 0]);
      });
    },
    _selfSetView: function _selfSetView(e) {
      // reset the map, and let setView synchronize the others.
      this.setView(this.getCenter(), this.getZoom(), NO_ANIMATION);
    },
    _syncOnMoveend: function _syncOnMoveend(e) {
      if (this._syncDragend) {
        // This is 'the moveend' after the dragend.
        // Without inertia, it will be right after,
        // but when inertia is on, we need this to detect that.
        this._syncDragend = false; // before calling setView!

        this._selfSetView(e);

        this._syncMaps.forEach(function (toSync) {
          toSync.fire('moveend');
        });
      }
    },
    _syncOnDragend: function _syncOnDragend(e) {
      // It is ugly to have state, but we need it in case of inertia.
      this._syncDragend = true;
    },
    // overload methods on originalMap to replay interactions on _syncMaps;
    _initSync: function _initSync() {
      if (this._syncMaps) {
        return;
      }

      var originalMap = this;
      this._syncMaps = [];
      this._cursors = [];
      this._syncOffsetFns = {};

      _leaflet["default"].extend(originalMap, {
        setView: function setView(center, zoom, options, sync) {
          // Use this sandwich to disable and enable viewprereset
          // around setView call
          function sandwich(obj, fn) {
            var viewpreresets = [];
            var doit = options && options.disableViewprereset && obj && obj._events;

            if (doit) {
              // The event viewpreresets does an invalidateAll,
              // that reloads all the tiles.
              // That causes an annoying flicker.
              viewpreresets = obj._events.viewprereset;
              obj._events.viewprereset = [];
            }

            var ret = fn(obj);

            if (doit) {
              // restore viewpreresets event to its previous values
              obj._events.viewprereset = viewpreresets;
            }

            return ret;
          } // Looks better if the other maps 'follow' the active one,
          // so call this before _syncMaps


          var ret = sandwich(this, function (obj) {
            return _leaflet["default"].Map.prototype.setView.call(obj, center, zoom, options);
          });

          if (!sync) {
            originalMap._syncMaps.forEach(function (toSync) {
              sandwich(toSync, function (obj) {
                return toSync.setView(originalMap._syncOffsetFns[_leaflet["default"].Util.stamp(toSync)](center, zoom, originalMap, toSync), zoom, options, true);
              });
            });
          }

          return ret;
        },
        panBy: function panBy(offset, options, sync) {
          if (!sync) {
            originalMap._syncMaps.forEach(function (toSync) {
              toSync.panBy(offset, options, true);
            });
          }

          return _leaflet["default"].Map.prototype.panBy.call(this, offset, options);
        },
        _onResize: function _onResize(event, sync) {
          if (!sync) {
            originalMap._syncMaps.forEach(function (toSync) {
              toSync._onResize(event, true);
            });
          }

          return _leaflet["default"].Map.prototype._onResize.call(this, event);
        },
        _stop: function _stop(sync) {
          _leaflet["default"].Map.prototype._stop.call(this);

          if (!sync) {
            originalMap._syncMaps.forEach(function (toSync) {
              toSync._stop(true);
            });
          }
        }
      });

      originalMap.dragging._draggable._updatePosition = function () {
        _leaflet["default"].Draggable.prototype._updatePosition.call(this);

        var self = this;

        originalMap._syncMaps.forEach(function (toSync) {
          _leaflet["default"].DomUtil.setPosition(toSync.dragging._draggable._element, self._newPos);

          toSync.eachLayer(function (layer) {
            if (layer._google !== undefined) {
              var offsetFn = originalMap._syncOffsetFns[_leaflet["default"].Util.stamp(toSync)];

              var center = offsetFn(originalMap.getCenter(), originalMap.getZoom(), originalMap, toSync);

              layer._google.setCenter(center);
            }
          });
          toSync.fire('move');
        });
      };
    }
  });
};

leafletSyncFn();