import React, { Component } from 'react';
import RollerMap from './RollerMap'

let rollerMap = {}

class Index extends Component {
    onRollerMapload = (gxMap, mapId) => {
        rollerMap.mapId = mapId
        rollerMap.map = gxMap
        setTimeout(() => {
            if (gxMap) {
                gxMap.resize()
            }
        }, 200)
    }
    render() {
        const { url, serviceType, serviceUrl } = this.props
        return (
            <RollerMap
                key='rollermap'
                onMapload={this.onRollerMapload}
                mapId='rollermap'
                url={url}
                serviceType={serviceType}
                serviceUrl={serviceUrl}

            ></RollerMap>
        );
    }
}

export default Index;