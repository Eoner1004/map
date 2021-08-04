import React from 'react'
import L from 'leaflet'
// import * as esri from 'esri-leaflet'
import bbox from '@turf/bbox';
// import { datamgUrl } from '../../../../../service/common' 在metainfo内传入

class MetaLayer extends React.PureComponent {
    componentWillUnmount() {
        this.removeLayers()
    }
    componentDidMount() {
        this.layerIndex = this.props.layerIndex
        this.metaInfoId = this.props.metaInfo.id

        this.updateMapLayer(this.props)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        let layerIndex = this.layerIndex !== nextProps.layerIndex
        let metaInfoId = this.metaInfoId !== nextProps.metaInfo.id


        if (layerIndex || metaInfoId) {
            this.layerIndex = nextProps.layerIndex
            this.metaInfoId = nextProps.metaInfo.id
            this.updateMapLayer(nextProps)
        }


        // let result = lodash.eq(this.metaInfo, nextProps.metaInfo)
        // if (!result) {
        //     this.updateMapLayer(nextProps)
        // }
    }
    updateMapLayer(props) {

        let layer = null
        if (props.gxMap) {
            let metaInfo = props.metaInfo
            if (this.layerId) {
                this.removeLayers()
            }
            layer = this.createMetaMapLayer(metaInfo)
            if (layer) {
                if (props.layerGroup) {
                    props.layerGroup.addLayer(layer)
                } else {
                    if (props.gxMap) {
                        layer.addTo(props.gxMap.getMap())
                    }
                }
                this.layerId = layer._leaflet_id
            }

        }


    }
    removeLayers() {
        if (this.props.gxMap) {
            let lmap = this.props.gxMap.getMap()
            if (this.layerId && lmap) {
                let layer = lmap._layers[this.layerId]
                if (layer) {
                    lmap.removeLayer(layer)
                }
            }
        }

    }
    /**
 * 创建元信息图层  影像 矢量  dem
 */
    createGxLayer(metaData) {
        let url = metaData.datamgUrl + "services/preview?crs=EPSG:3857&l={z}&x={x}&y={y}&metaId=" + metaData.id

        let bounds = null;
        if (metaData.geometry) {
            try {
                let geometry = JSON.parse(metaData.geometry)

                let box = bbox(geometry);
                var corner1 = L.latLng(box[1], box[0])
                let corner2 = L.latLng(box[3], box[2])
                bounds = L.latLngBounds(corner1, corner2);


            } catch (error) {

            }

        }

        let layer = new L.TileLayer(url, bounds == null ? {} : { bounds: bounds, maxZoom: 24 })
        let index = 950
        if (this.layerIndex) {
            index = 950 + this.layerIndex * 5
        }
        layer.setZIndex(index)
        return layer

    }
    createServiceLayer(serviceUrl) {
        // let layer = esri.dynamicMapLayer({
        //     url: serviceUrl.value,
        //     transparent: true,
        //     f: 'image',
        //     opacity: 0.8
        // })

        // layer.setZIndex(900)
        // return layer

    }
    createXyzServiceLayer(serviceUrl, attribution) {
        let layer = L.tileLayer(serviceUrl.value, {
            maxZoom: 24,
            minZoom: 0
        });
        layer.setZIndex(900)
        return layer
    }
    /**
  * 创建图层id，用来存储
  * @param {*} action 
  * @param {*} tempLayer 
  */
    createMetaMapLayer(metaData) {
        if (metaData.notShow) {
            return null
        }
        let layer = null
        if (metaData.imgType === "Raster" || metaData.imgType === "Vector" || metaData.imgType === "Dem") {
            layer = this.createGxLayer(metaData)
        } else if (metaData.imgType === "Service") {
            let serviceType = metaData.attributes.find(it => it.field.name === 'serviceType')
            let serviceUrl = metaData.attributes.find(it => it.field.name === 'serviceUrl')
            //版权
            let attribution = metaData.attributes.find(it => it.field.name === 'attribution')

            if (serviceType && serviceUrl) {
                if (serviceType.value === "esri") {
                    layer = this.createServiceLayer(serviceUrl)
                } else if (serviceType.value === "xyz") {
                    layer = this.createXyzServiceLayer(serviceUrl, attribution)
                }
            }
        }

        this.metaData = metaData
        return layer
    }


    render() {

        return (<></>)
    }
}

export default MetaLayer