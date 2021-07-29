import L from 'leaflet'
import bboxPolygon from '@turf/bbox-polygon'
import bbox from '@turf/bbox';
import * as turf from '@turf/turf';

import GxMap from './GxMap'
// import { IMAGE_PATH } from '../../../service/common'

import './control/position/L.Control.MousePosition'
import './control/position/L.Control.MousePosition.css'

import './control/zoom/L.Control.Zoomslider'
import './control/zoom/L.Control.Zoomslider.css'

import './control/zoomlabel/L.Control.ZoomLabel'
import './control/zoomlabel/L.Control.ZoomLabel.css'

import './L.Map.Sync'

/**
 * 地图
 */
class LeafletMap extends GxMap {
    constructor(container, obj) {
        super()
        this.map = this.createMap(container, obj)
        this.initMapEvent(this.map)
    }
    createMap(container, obj) {
        let map = L.map(container, {
            center: [33.7286578, 107.402338],
            zoom: 4,
            zoomControl: false,
            crs: L.CRS.EPSG3857,
            minZoom: 3,
            maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
            attributionControl:false
        });
        if (obj && obj.zoomNotShow) {

        } else {
            L.control.mousePosition({ position: 'bottomright' }).addTo(map);
        }
        if (obj && obj.notShowZoomslider) {

        } else {
            L.control.zoomslider({
                position: "bottomright"
            }).addTo(map);
            L.control.zoomLabel({
                position: "bottomright"
            }).addTo(map);
        }

        // L.control.mousePosition({ position: 'bottomright' }).addTo(map);

        // L.control.zoomslider({
        //     position: "bottomright"
        // }).addTo(map);

        // L.control.zoomLabel({
        //     position: "bottomright"
        // }).addTo(map);


        return map
    }
    initMapEvent(map) {
        map.on('click', (e) => {
            // if (this.onQueryFeature) {
            //     this.onQueryFeature(e)
            // }
            let point = e.layerPoint
            let maxPoint = {
                x: point.x + 5,
                y: point.y + 5,
            }
            let minPoint = {
                x: point.x - 5,
                y: point.y - 5,
            }

            let max = map.layerPointToLatLng(maxPoint)
            let min = map.layerPointToLatLng(minPoint)
            let box = bboxPolygon([min.lng, min.lat, max.lng, max.lat]);

            let geometry = box.geometry

            if (this.onQueryFeature) {
                this.onQueryFeature(geometry)
            }

            if (this.getCenterPointer) {

                this.getCenterPointer(e)
            }
        });
        map.on('mousemove', (e) => {
            if (this.onMouseMove) {
                this.onMouseMove(e)
            }
        });
        map.on('contextmenu', (e) => {
            if (this.onMouseRight) {
                this.onMouseRight(e)
            }
        });
        map.on('dblclick', (e) => {
            if (this.onMouseDblclick) {
                this.onMouseDblclick(e)
            }
        });
        map.on('mousedown', (e) => {
            if (this.onMouseDown) {
                this.onMouseDown(e)
            }
        });
        map.on('mouseup', (e) => {
            let point = e.layerPoint
            let maxPoint = {
                x: point.x + 1,
                y: point.y + 1,
            }
            let minPoint = {
                x: point.x - 1,
                y: point.y - 1,
            }
            let max = map.layerPointToLatLng(maxPoint)
            let min = map.layerPointToLatLng(minPoint)
            let box = bboxPolygon([min.lng, min.lat, max.lng, max.lat]);

            let geometry = box.geometry
            if (this.onMouseUp) {
                this.onMouseUp(e, geometry)
            }
        });
    }
    getMap() {
        return this.map
    }

    removeLayer(layerId) {
        if (layerId) {
            let layer = this.map._layers[layerId]
            if (layer) {
                this.map.removeLayer(layer)
            }
        }
    }

    resize() {
        if (this.map) {
            this.map._onResize()
        }
    }
    setDragging(state) {
        if (this.map) {
            if (state) {
                this.map.dragging.enable();
            } else {
                this.map.dragging.disable();
            }
        }
    }
    /**
     * 定位元信息,根据元信息的外接边框进行定位
     * @param {*} metaInfo 
     */
    locationMetaInfo(metaInfo) {
        let box = metaInfo.getBBox()
        if (box) {
            var corner1 = L.latLng(box[1], box[0])
            let corner2 = L.latLng(box[3], box[2])
            let bounds = L.latLngBounds(corner1, corner2);
            this.getMap().fitBounds(bounds, { padding: [100, 100] });
        }
    }
    /**
     * 定位几何元素
     * @param {*} geometry 
     */
    locationGeometry(geometry) {
        let box = bbox(geometry);
        var corner1 = L.latLng(box[1], box[0])
        let corner2 = L.latLng(box[3], box[2])
        let bounds = L.latLngBounds(corner1, corner2);
        this.getMap().fitBounds(bounds, { padding: [100, 100] });
    }
    locationServiceInfo(serviceInfo) {
        let layers = serviceInfo.layers
        let geometry = null
        for (let i = 0; i < layers.length; i++) {
            let layer = layers[i]
            let source = layer.source
            let g = JSON.parse(source.extent)
            let tempGeometry = g
            if (!g.geometry) {
                tempGeometry = turf.feature(g)
            }
            if (i > 0) {
                tempGeometry = turf.union(geometry, tempGeometry);
            }
            geometry = tempGeometry
        }

        if (geometry != null) {
            let box = bbox(geometry);
            var corner1 = L.latLng(box[1], box[0])
            let corner2 = L.latLng(box[3], box[2])
            let bounds = L.latLngBounds(corner1, corner2);
            this.getMap().fitBounds(bounds, {
                padding: [100, 100],
                linear: true
            });
        }
    }
    locationLayer(layer) {
        let geometry = null
        let source = layer.source
        geometry = JSON.parse(source.extent)
        if (geometry != null) {
            let box = bbox(geometry);
            var corner1 = L.latLng(box[1], box[0])
            let corner2 = L.latLng(box[3], box[2])
            let bounds = L.latLngBounds(corner1, corner2);

            this.getMap().fitBounds(bounds, {
                padding: [100, 100],
                linear: true
            });
        }

    }
    // 根据经纬度 点定位
    locationPoint(point,zoom){
        if(Array.isArray(point)){
            this.getMap().setView(point,zoom)

        }
    }
    /**
     * @name: 标点
     * @msg: 
     * @param {type} point:[],title:标记名称
     * @return: 
     */

    addMarkerList = (point) => {
        this.deleteMarker();

        let markers = [];
        let iconOptions = {
            // iconUrl: `${IMAGE_PATH}/ws.png`,
            iconSize: [25, 35]
        }

        let customIcon = L.icon(iconOptions);
        let markerOptions = {
            icon: customIcon
        }
        let mar = L.marker(point, markerOptions)
        mar.setZIndexOffset(9999)
        mar.addTo(this.map);
        markers.push(mar)
        this.marker = markers.map((item) => { return item._leaflet_id })
        return this.marker
    }
    // 删除标记点
    deleteMarker = () => {

        if (this.marker) {
            this.marker.forEach((it) => {
                let layer = this.map._layers[it]
                if (layer) {
                    this.map.removeLayer(layer)
                }
            })
        }

    }


}
export default LeafletMap