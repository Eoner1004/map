import React from 'react'

import MapControl from './MapControl'

import MultiwindowMap from './MultiwindowMap'
import TimeSeriesMap from './TimeSeriesMap'
import RollerMap from './RollerMap'

import BaseMapLayer from './layer/BaseMapLayer'
import MetaLayer from './layer/MetaLayer'
import UrlLayer from './layer/UrlLayer'

export default class Map extends React.Component {
    constructor(props){
        super(props)
        this.state={
            gxMap: null,
        }
    }
    onMapload = (gxMap) => {
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(this, gxMap);
        }
    }
    render(){
        const {url,isMapType} = this.props
    let gxMap = this.state.gxMap
    let multiwindowMapList = [
        {
            mapId: 'multiwindow1',
            styleObj: {
                top: '0', left: '0', right: '50%', bottom: '50%', borderRight: '1px solid #333', borderBottom: '1px solid #333',
            },
            clearStyle: {
                left: '10px', bottom: '10px'
            },
            notShowZoomslider: true,
            zoomNotShow: true

        },
        {
            mapId: 'multiwindow2',
            styleObj: {
                top: '0', left: 'calc(50% + 1px)', right: '0', bottom: '50%', borderLeft: '1px solid #333', borderBottom: '1px solid #333',
            },
            clearStyle: {
                left: '10px', bottom: '10px'
            },
            notShowZoomslider: true,
            zoomNotShow: true

        },
        {
            mapId: 'multiwindow3',
            styleObj: {
                top: 'calc(50% + 1px)', left: '0', right: '50%', bottom: '0', borderRight: '1px solid #333', borderTop: '1px solid #333',
            },
            clearStyle: {
                left: '10px', bottom: '10px'
            },
            notShowZoomslider: true,
            zoomNotShow: true

        },
        {
            mapId: 'multiwindow4',
            styleObj: {
                top: 'calc(50% + 1px)', left: 'calc(50% + 1px)', right: '0', bottom: '0', borderLeft: '1px solid #333', borderTop: '1px solid #333',
            },
            clearStyle: {
                left: '10px', bottom: '10px'
            },
            zoomNotShow: true

        },
    ]
    return <div>
        {isMapType === 'normal' && <MapControl
                        mapId={this.props.mapId || 'servicemap'}
                        // bounds={bounds}
                        onLoad={this.onMapload}
                        onQueryFeature={this.onQueryFeature}
                        onMouseRight={this.onMouseRight}
                        onMouseMove={this.onMouseMove1}
                        onMouseDblclick={this.onMouseDblclick}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        getCenterPointer={this.getCenterPointer}

                    >

                        {/* {gxMap && !isNotShowBaseLayer && baseLayerMetaInfo && */}
                            <BaseMapLayer serviceType='xyz' serviceUrl='https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'></BaseMapLayer>
                            {url&&<UrlLayer url={url}/>}
                        {/* } */}
                        {/* {gxMap && isNotShowBaseLayer && serviceType && serviceUrl &&
                            < BaseMapLayer serviceType={serviceType.value} serviceUrl={serviceUrl.value}></BaseMapLayer>
                        } */}
                        {/* {gxMap && serviceItem && <ServiceLayer serviceItem={serviceItem} isCache={this.props.isCache}></ServiceLayer>} */}
                        {/* {gxMap && thirdServiceUrl && <ThirdServiceLayer thirdServiceUrl={thirdServiceUrl} ></ThirdServiceLayer>} */}
                        {/* {gxMap && tileItem && <TileLayer tileItem={tileItem} ></TileLayer>} */}

                        {/* {gxMap && metaList && metaList.map((metaInfo, index) => {
                            return (<MetaLayer key={metaInfo.id} metaInfo={metaInfo} layerIndex={metaInfo.layerIndex || index}></MetaLayer>)
                        })} */}

                        {/* {gxMap && geometrys && geometrys.length > 0 && <FeatureLayer features={geometrys}></FeatureLayer>} */}
                        {/* {gxMap && this.props.geometrys && this.props.geometrys.length > 0 && this.props.geometrys.map((item)=>{
                            return <FeatureLayerPre features={[item]}></FeatureLayerPre>
                        })} */}

                        {/* {gxMap && plugins.map(plugin => {
                            return plugin
                        })} */}
                    </MapControl>}
                    {
                        isMapType === 'timeSeries' && <TimeSeriesMap

                            onMapload={this.onTimeMapload}
                            mapId='timeSeriesMap'
                            baseLayerMetaInfo={baseLayerMetaInfo}
                            serviceType={serviceType.value}
                            serviceUrl={serviceUrl.value}

                        ></TimeSeriesMap>
                    }
                    {isMapType === 'multiwindow' &&
                        <div className='brace-up'>
                            {multiwindowMapList.map(it => <MultiwindowMap
                                key={it.mapId}
                                onMapload={this.onMultiwindowMapload}
                                notShowZoomslider={it.notShowZoomslider}
                                zoomNotShow={it.zoomNotShow}
                                mapId={it.mapId}
                                baseLayerMetaInfo={baseLayerMetaInfo}
                                serviceType={serviceType.value}
                                serviceUrl={serviceUrl.value}
                                styleObj={it.styleObj}
                                clearStyle={it.clearStyle}
                                onMouseMove={this.onMouseMove}
                                mouseTop={mouseTop}
                                mouseleft={mouseleft}
                                haveMouse={haveMouse}
                            ></MultiwindowMap>)}
                        </div>
                    }
                    {isMapType === 'roller' &&
                        <RollerMap
                            key='rollermap'
                            onMapload={this.onRollerMapload}
                            mapId='rollermap'
                            baseLayerMetaInfo={baseLayerMetaInfo}
                            serviceType={serviceType.value}
                            serviceUrl={serviceUrl.value}

                        ></RollerMap>
                    }
    </div>
    }
}