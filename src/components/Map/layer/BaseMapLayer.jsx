import React from 'react'
import L from 'leaflet'
// import * as esri from 'esri-leaflet'
// import leaflet_wmts from '../../leaflet_wmts'

class BaseMapLayer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }
    createBaseMapLayers(serviceType, url) {

        let serviceLayer = null
        if (serviceType === "esri") {
            // serviceLayer = esri.dynamicMapLayer({
            //     url: url,
            //     transparent: true,
            //     f: 'image',
            //     opacity: 0.8
            // })
        } else if (serviceType === 'xyz') {
            serviceLayer = L.tileLayer(url, {
                maxZoom: 20,
                minZoom: 0,
            });
        } else if (serviceType === 'wms') {
            // serviceLayer = L.tileLayer.wms(url, {
            //     layers: '',
            //     format: 'image/png',
            //     transparent: true,
            // });
        } else if (serviceType === 'wmts') {

            // serviceLayer =leaflet_wmts(url, {
            //         tileSize:256,
            //         layer: 'vec_c',
            //         style: "default",
            //         tilematrixSet: "c",
            //         format: "tile",
            //         attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
            // });

        }

        if (serviceLayer) {
            serviceLayer.setZIndex(10)
            if (this.props.gxMap) {
                serviceLayer.addTo(this.props.gxMap.getMap())

            }

            return serviceLayer._leaflet_id
        }
        return null
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        if (this.baseMapLayer) {
            this.props.gxMap.removeLayer(this.baseMapLayer)
        }
    }
    render() {

        if (this.props.serviceType && this.props.serviceUrl && this.props.gxMap) {
            if (this.baseMapLayer) {
                this.props.gxMap.removeLayer(this.baseMapLayer)
            }
            let serviceType = this.props.serviceType
            let serviceUrl = this.props.serviceUrl
            this.baseMapLayer = this.createBaseMapLayers(serviceType, serviceUrl)
        } else {
            if (this.baseMapLayer && this.props.gxMap) {
                this.props.gxMap.removeLayer(this.baseMapLayer)
            }
        }
        return (<></>)
    }
}

export default BaseMapLayer