import * as turf from '@turf/turf';

class GxMap {
    getServiceInfoExtent(serviceInfo) {
        let geometry = null
        for (let i = 0; i < serviceInfo.layers.length; i++) {
            let layer = serviceInfo.layers[i]
            let source = layer.source
            let g = JSON.parse(source.extent)
            let tempGeometry= g
            if(!g.geometry){
                tempGeometry= turf.feature(g)
            }
            if (i > 0) {
                tempGeometry = turf.union(geometry, tempGeometry);
            }
            geometry = tempGeometry
        }
        return geometry        
    }
}

export default GxMap