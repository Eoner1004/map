import React from 'react'

import MapControl from './MapControl'

import MultiwindowMap from './MultiwindowMap'
import TimeSeriesMap from './TimeSeriesMap'
import RollerMap from './RollerMap'

import BaseMapLayer from './layer/BaseMapLayer'
// import MetaLayer from './layer/MetaLayer'
import UrlLayer from './layer/UrlLayer'

let mapList = []
let timeMap = {}
let rollerMap = {}
// 感觉整个Map向是一个测试用的，如果粒度细的话，Map应该不在这个组件里出现，而是在业务系统，你考虑下，在优化下
// 可以放在example目录中进行测试，这些都是不提交到仓库中的
export default class Map extends React.Component {
    constructor(props){
        super(props)
        this.state={
            gxMap: null,

            mouseTop: 10,
            mouseleft: 10,
            haveMouse: null,
        }
    }
    onMapload = (gxMap) => {
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(this, gxMap);
        }
    }
    onMultiwindowMapload = (gxMap, mapId) => {
        let mapObj = {}
        mapObj.mapId = mapId
        mapObj.map = gxMap
        mapList.push(mapObj)
        if (mapList.length === 4) {
            for (let i = 0; i < mapList.length; i++) {
                let listA = mapList[i]
                for (let q = 0; q < mapList.length; q++) {
                    let listB = mapList[q]
                    if (listA.mapId !== listB.mapId) {
                        let map1 = listA.map.getMap()
                        let map2 = listB.map.getMap()
                        // console.log()
                        map1.sync(map2)
                    }
                }
            }
        }
    }
    onMouseMove = (e, mapId) => {
        let containerPoint = e.containerPoint
        let top = containerPoint.y
        let left = containerPoint.x

        this.setState({
            mouseTop: top,
            mouseleft: left,
            haveMouse: mapId
        })

    }
    onRollerMapload = (gxMap, mapId) => {
        rollerMap.mapId = mapId
        rollerMap.map = gxMap
        setTimeout(() => {
            if (gxMap) {
                gxMap.resize()
            }
        }, 200)
    }
    onTimeMapload = (gxMap, mapId) => {
        timeMap.mapId = mapId
        timeMap.map = gxMap
        setTimeout(() => {
            if (gxMap) {
                gxMap.resize()
            }
        }, 200)
    }

    render(){
        const {url,isMapType, serviceType,serviceUrl, haveMouse} = this.props
        let mouseTop = this.state.mouseTop || 20
        let mouseleft = this.state.mouseleft || 20
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
                            <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                            {url&&<UrlLayer url={url}/>}
                    </MapControl>}
                    {
                        isMapType === 'timeSeries' && <TimeSeriesMap
                            onMapload={this.onTimeMapload}
                            mapId='timeSeriesMap'
                            metaList={url}
                            serviceType={serviceType}
                            serviceUrl={serviceUrl}

                        ></TimeSeriesMap>
                    }
                    {isMapType === 'multiwindow' &&
                        <div className='brace-up'>
                            {multiwindowMapList.map((it,index) => <MultiwindowMap
                                showDataList={[url[index]]}
                                key={it.mapId}
                                onMapload={this.onMultiwindowMapload}
                                notShowZoomslider={it.notShowZoomslider}
                                zoomNotShow={it.zoomNotShow}
                                mapId={it.mapId}
                                serviceType={serviceType}
                                serviceUrl={serviceUrl}
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
                            url={url}
                            serviceType={serviceType}
                            serviceUrl={serviceUrl}

                        ></RollerMap>
                    }
    </div>
    }
}