import React from 'react'
import L from 'leaflet'
// import * as esri from 'esri-leaflet'
import bbox from '@turf/bbox';

class MetaLayer extends React.PureComponent {
    componentWillUnmount() {
        this.removeLayers()
    }
    componentDidMount() {
        // this.layerIndex = this.props.layerIndex
        // this.metaInfoId = this.props.metaInfo.id

        this.updateMapLayer(this.props)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        let url = this.url !== nextProps.url

        if (url) {
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
            let url = props.url
            if (this.layerId) {
                this.removeLayers()
            }
            layer = this.createMetaMapLayer(url)
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
    createGxLayer(url) {
        
        let layer = new L.TileLayer(url)
        let index = 950
        // if (this.layerIndex) {
        //     index = 950 + this.layerIndex * 5
        // }
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
    createMetaMapLayer(url) {
        
        let layer = null
        layer = this.createGxLayer(url)

        this.url = url
        return layer
    }


    render() {

        return (<></>)
    }
}

export default MetaLayer