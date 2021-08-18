import React from 'react'
import L from 'leaflet'

function getMaxMinZoom(serviceInfo) {

    if(!serviceInfo.layers) return {maxZoom: 24, minZoom: 1 }
    let maxZoom = null
    let minZoom = null

    serviceInfo.layers.forEach(layer => {
        if (layer) {
            if (layer.maxLevel) {
                maxZoom = maxZoom ? Math.max(maxZoom, layer.maxLevel) : layer.maxLevel
            }
            if (layer.minLevel) {
                minZoom = minZoom ? Math.min(minZoom, layer.minLevel) : layer.minLevel
            }
        }
    })
    if (maxZoom === null || minZoom === null) {
        return { maxZoom: 24, minZoom: 1 }
    }
    if(minZoom===0||minZoom==='0'){
        minZoom=1
    }
    return { maxZoom: maxZoom, minZoom: minZoom }

}

class ServiceLayer extends React.PureComponent {
    componentWillUnmount() {
        this.removeLayers()
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
    componentDidMount() {
        this.updateMapLayer(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // let result = lodash.eq(this.props.serviceItem, nextProps.serviceItem)
        let result = JSON.stringify(this.props.serviceItem)===JSON.stringify(nextProps.serviceItem)
        if (!result) {
            this.updateMapLayer(nextProps)
        }
    }
    updateMapLayer(props) {
        if (props.gxMap) {
            let serviceItem = props.serviceItem
            if (this.layerId) {
                this.removeLayers()
            }
            // let layers = serviceItem.layers.map(it => it.name)
            let layers = []
            if(serviceItem.layers){
                serviceItem.layers.forEach(it => {
                    if (it) {
                        layers.push(it.name)
                    }
                })
            }
            
            let layer = this.createMapServiceLayer(serviceItem, layers)

            if (props.layerGroup) {
                props.layerGroup.addLayer(layer)
            } else {
                if (props.gxMap&&layer) {
                    layer.addTo(props.gxMap.getMap())

                }
            }
            if(layer){
                this.layerId = layer._leaflet_id
            }
        }
    }
    createMapServiceLayer(serviceInfo, layers) {
        let opt = getMaxMinZoom(serviceInfo)
        let cache = true
        if (serviceInfo.isCache) {
            cache = false
        }

        let time = new Date().getTime()

        let serviceLayer = null

        if (layers&&layers.length>0) {
            serviceLayer = L.tileLayer(serviceInfo.datamgUrl + "services/tile?x={x}&y={y}&l={z}&crs=EPSG:3857&serviceId="
                + serviceInfo.id + '&time=' + time + '&layers=' + layers + '&cache=' + cache, opt);
            serviceLayer.setZIndex(100)
        }



        return serviceLayer
    }
    render() {
        return (<></>)
    }
}

export default ServiceLayer