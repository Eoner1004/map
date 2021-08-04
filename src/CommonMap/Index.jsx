import React, { Component } from 'react';
import MapControl from '../components/Map/MapControl';
import BaseMapLayer from '../components/Map/layer/BaseMapLayer';
import UrlLayer from '../components/Map/layer/UrlLayer';
import FeatureLayer from '../components/Map/layer/FeatureLayer';
import MetaLayer from '../components/Map/layer/MetaLayer'

class CommonMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gxMap: null,
        }
    }

    onMapload = (gxMap) => {
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(gxMap);
        }
    }
    render() {
        const { mapId, serviceType, serviceUrl, url, metaList, geometrys } = this.props
        const { gxMap } = this.state

        return (
            <MapControl
                mapId={mapId || 'servicemap'}
                onLoad={this.onMapload}
                onQueryFeature={this.props.onQueryFeature}
            >
                <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                {gxMap && url && <UrlLayer url={url} />}
                {gxMap && metaList && metaList.map((metaInfo, index) => {
                    return (<MetaLayer key={metaInfo.id} metaInfo={metaInfo} layerIndex={metaInfo.layerIndex || index}></MetaLayer>)
                })}
                {gxMap && geometrys && geometrys.length > 0 && <FeatureLayer features={geometrys}></FeatureLayer>}

            </MapControl>
        );
    }
}

export default CommonMap;