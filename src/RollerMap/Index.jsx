import React, { Component } from 'react';
import RollerMap from './RollerMap'
import PubSub from 'pubsub-js'
import MetaInfo from '../components/Map/MetaInfo'

let rollerMap = {}

class Index extends Component {
    constructor(props){
        super(props)
        let baseLayerMetaInfo = this.getBaseMapMetaInfo()
        this.state={
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
        let baseLayerMetaInfo = this.state.baseLayerMetaInfo
        let serviceType = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceType') : ""
        let serviceUrl = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceUrl') : ""
        const { url, dragData } = this.props
        return (
            <RollerMap
                key='rollermap'
                onMapload={this.onRollerMapload}
                mapId='rollermap'
                url={url}
                serviceType={serviceType.value}
                serviceUrl={serviceUrl.value}
                dragData={dragData}
            ></RollerMap>
        );
    }
}

export default Index;