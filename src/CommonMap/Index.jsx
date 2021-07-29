import React, { Component } from 'react';
import MapControl from '../components/Map/MapControl';
import BaseMapLayer from '../components/Map/layer/BaseMapLayer';
import UrlLayer from '../components/Map/layer/UrlLayer';

class CommonMap extends Component {
    onMapload = (gxMap) => {
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(this, gxMap);
        }
    }
    render() {
        const { mapId, serviceType, serviceUrl, url } = this.props
        return (
            <MapControl
                mapId={mapId || 'servicemap'}
                onLoad={this.onMapload}
            >
                <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                {url && <UrlLayer url={url} />}
            </MapControl>
        );
    }
}

export default CommonMap;