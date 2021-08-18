import React, { Component } from 'react';
import MultiwindowMap from './MultiwindowMap';
import { multiwindowMapList } from './multiwindowMapList'
import PubSub from 'pubsub-js'
import MetaInfo from '../components/Map/MetaInfo'

let mapList = []

class Index extends Component {
    constructor(props){
        super(props)
        let baseLayerMetaInfo = this.getBaseMapMetaInfo()
        this.state={
            mouseTop: 10,
            mouseleft: 10,
            haveMouse: null,
            baseLayerMetaInfo:baseLayerMetaInfo
        }
    }
    getBaseMapMetaInfo() {
        let baseMap = localStorage.getItem('baseMap') || ''
        if (baseMap) {
            let item = JSON.parse(baseMap)
            let metainfo = Object.assign(new MetaInfo(), item)
            return metainfo
        }
        return null
    }
    componentDidMount(){
        //订阅底图切换事件
        this.pubsub_basemapchange = PubSub.subscribe('changeBaseMap', (topic, baseLayerMetaInfo)=>{
            this.setState({
                baseLayerMetaInfo
            })
        })
    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_basemapchange);
    }
    onMultiwindowMapload = (gxMap, mapId) => {
        if (mapList.length === 4) {
            mapList = []
        }
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
    render() {
        let baseLayerMetaInfo = this.state.baseLayerMetaInfo
        let serviceType = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceType') : ""
        let serviceUrl = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceUrl') : ""
        const {url,dragData} = this.props
        let haveMouse = this.state.haveMouse
        let mouseTop = this.state.mouseTop || 20
        let mouseleft = this.state.mouseleft || 20
        return (
            <div className='brace-up'>
                {multiwindowMapList.map((it, index) => <MultiwindowMap
                    showDataList={url&&url.length?[url[index]]:[]}
                    key={it.mapId}
                    onMapload={this.onMultiwindowMapload}
                    notShowZoomslider={it.notShowZoomslider}
                    zoomNotShow={it.zoomNotShow}
                    mapId={it.mapId}
                    serviceType={serviceType.value}
                    serviceUrl={serviceUrl.value}
                    styleObj={it.styleObj}
                    onMouseMove={this.onMouseMove}
                    mouseTop={mouseTop}
                    mouseleft={mouseleft}
                    haveMouse={haveMouse}
                    dragData={dragData}
                ></MultiwindowMap>)}
            </div>
        );
    }
}

export default Index;