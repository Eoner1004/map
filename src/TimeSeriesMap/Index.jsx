import React, { Component } from 'react';
import TimeSeriesMap from './TimeSeriesMap'

let timeMap = {}

class Index extends Component {
    onTimeMapload = (gxMap, mapId) => {
        timeMap.mapId = mapId
        timeMap.map = gxMap
        setTimeout(() => {
            if (gxMap) {
                gxMap.resize()
            }
        }, 200)
    }
    render() {
        const { url, serviceType, serviceUrl } = this.props
        return (
            <TimeSeriesMap
                            onMapload={this.onTimeMapload}
                            mapId='timeSeriesMap'
                            metaList={url}
                            serviceType={serviceType}
                            serviceUrl={serviceUrl}

                        ></TimeSeriesMap>
        );
    }
}

export default Index;