import React from 'react'
import L from 'leaflet'

class FeatureLayer extends React.PureComponent {
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


    render() {
        if (this.props.gxMap) {
            let features = this.props.features
            if (this.layerId) {
                this.removeLayers()
            }
            let layer = L.geoJSON(features, {
                style: function (feature) {
                    return {
                        color: 'Yellow',
                        fillColor: 'Red',
                        fillOpacity: 0.8,
                        weight: 2.5
                    };
                }
            })

            if (this.props.layerGroup) {
                this.props.layerGroup.addLayer(layer)
            } else {
                layer.addTo(this.props.gxMap.getMap())
            }
            this.layerId = layer._leaflet_id
        }

        return (<></>)
    }
}

export default FeatureLayer