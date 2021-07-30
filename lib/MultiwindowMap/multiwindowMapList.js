"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiwindowMapList = void 0;
var multiwindowMapList = [{
  mapId: 'multiwindow1',
  styleObj: {
    top: '0',
    left: '0',
    right: '50%',
    bottom: '50%',
    borderRight: '1px solid #333',
    borderBottom: '1px solid #333'
  },
  clearStyle: {
    left: '10px',
    bottom: '10px'
  },
  notShowZoomslider: true,
  zoomNotShow: true
}, {
  mapId: 'multiwindow2',
  styleObj: {
    top: '0',
    left: 'calc(50% + 1px)',
    right: '0',
    bottom: '50%',
    borderLeft: '1px solid #333',
    borderBottom: '1px solid #333'
  },
  clearStyle: {
    left: '10px',
    bottom: '10px'
  },
  notShowZoomslider: true,
  zoomNotShow: true
}, {
  mapId: 'multiwindow3',
  styleObj: {
    top: 'calc(50% + 1px)',
    left: '0',
    right: '50%',
    bottom: '0',
    borderRight: '1px solid #333',
    borderTop: '1px solid #333'
  },
  clearStyle: {
    left: '10px',
    bottom: '10px'
  },
  notShowZoomslider: true,
  zoomNotShow: true
}, {
  mapId: 'multiwindow4',
  styleObj: {
    top: 'calc(50% + 1px)',
    left: 'calc(50% + 1px)',
    right: '0',
    bottom: '0',
    borderLeft: '1px solid #333',
    borderTop: '1px solid #333'
  },
  clearStyle: {
    left: '10px',
    bottom: '10px'
  },
  zoomNotShow: true
}];
exports.multiwindowMapList = multiwindowMapList;