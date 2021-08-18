import React, { Component } from 'react';
import MapControl from '../components/Map/MapControl';
import BaseMapLayer from '../components/Map/layer/BaseMapLayer';
import UrlLayer from '../components/Map/layer/UrlLayer';
import FeatureLayer from '../components/Map/layer/FeatureLayer';
import MetaLayer from '../components/Map/layer/MetaLayer';
import ServiceLayer from '../components/Map/layer/ServiceLayer'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import MetaInfo from '../components/Map/MetaInfo'

class CommonMap extends Component {
    constructor(props) {
        super(props)
        let baseLayerMetaInfo = this.getBaseMapMetaInfo()
        this.state = {
            gxMap: null,
            metaList: [],
            baseLayerMetaInfo: baseLayerMetaInfo,
            geometrys:[]
        }
        CommonMap.setData = this.setData.bind(this)
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
    componentDidMount() {
        //订阅树的点击事件
        this.pubsub_metaclick = PubSub.subscribe('onRelatedClick', function (topic, item) {
            let newMataList = !this.state.metaList ? [] : [...this.state.metaList]
            let index = newMataList.findIndex(it => it.id === item.id)
            if (index > -1) {
                newMataList.splice(index, 1)
            } else {
                newMataList.push(item.obj)
            }
            let metaList_pro = newMataList.map((it) => {
                return {
                    ...it,
                    datamgUrl: this.props.datamgUrl
                }
            })
            this.setState({
                metaList: metaList_pro
            }, () => {
                let gxMap = this.state.gxMap;
                if (item.obj.checkStatus !== 2) {
                    return message.warning('矢量正在上传队列中，请稍候刷新再试')
                } else {
                    if (!item.obj.geometry) {
                        // message.warning('无位置信息')
                        let attributes = _.get(item, 'obj.attributes', []);
                        let centerData = attributes.find((it) => it.field.name === 'centerPoint')
                        let centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : []

                        if (centerPoint.length && gxMap) {
                            let zoomData = attributes.find((it) => it.field.name === 'zoom')
                            let zoom = zoomData && zoomData.value ? zoomData.value : 10

                            let point = [centerPoint[1], centerPoint[0]]
                            gxMap.locationPoint(point, zoom)
                        } else {
                            message.warning('无位置信息')
                        }

                    }
                    setTimeout(() => {
                        if (gxMap) {
                            let metinfo = Object.assign(new MetaInfo(), item);
                            gxMap.locationMetaInfo(metinfo)
                            gxMap.resize()
                        }
                    }, 220);
                }
            });
        }.bind(this));

        //订阅选中列表的关闭事件
        this.pubsub_metaclose = PubSub.subscribe('closeSelect', (topic, item) => {
            if (!item) {
                this.setState({ metaList: null })
            } else {
                let newMetaList = !this.state.metaList ? [] : [...this.state.metaList]
                let index = newMetaList.findIndex(it => it.id === item.obj.id)
                if (index > -1) {
                    newMetaList.splice(index, 1)
                } else {
                    newMetaList.push(item.obj)
                    newMetaList=newMetaList.map((it) => {
                        return {
                            ...it,
                            datamgUrl: this.props.datamgUrl
                        }
                    })
                }
                this.setState({ metaList: newMetaList })
            }
        })

        //订阅底图切换事件
        this.pubsub_basemapchange = PubSub.subscribe('changeBaseMap', (topic, baseLayerMetaInfo)=>{
            this.setState({
                baseLayerMetaInfo
            })
        })

        //订阅高亮要素geometry消息
        this.pubsub_featuregeometry = PubSub.subscribe('featureGeometry', (topic, geometrys)=>{
            this.setState({
                geometrys
            })
        })

        //订阅服务
        this.pubsub_serviceitem = PubSub.subscribe('setServiceItem', (topic, serviceItem)=>{
            this.setState({
                serviceItem
            })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_metaclick);
        PubSub.unsubscribe(this.pubsub_metaclose);
        PubSub.unsubscribe(this.pubsub_basemapchange);
        PubSub.unsubscribe(this.pubsub_featuregeometry);
        PubSub.unsubscribe(this.pubsub_serviceitem);
    }

    setData = (data) => {
        if (data) {
            let newMataList = [...this.state.metaList]
            newMataList.push(data.obj)
            let metaList_pro = newMataList.map((it) => {
                return {
                    ...it,
                    datamgUrl: this.props.datamgUrl
                }
            })
            this.setState({
                metaList: metaList_pro
            }, () => {
                let gxMap = this.state.gxMap;
                if (data.obj.checkStatus !== 2) {
                    return message.warning('矢量正在上传队列中，请稍候刷新再试')
                } else {
                    if (!data.obj.geometry) {
                        // message.warning('无位置信息')
                        let attributes = _.get(data, 'obj.attributes', []);
                        let centerData = attributes.find((it) => it.field.name === 'centerPoint')
                        let centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : []

                        if (centerPoint.length && gxMap) {
                            let zoomData = attributes.find((it) => it.field.name === 'zoom')
                            let zoom = zoomData && zoomData.value ? zoomData.value : 10

                            let point = [centerPoint[1], centerPoint[0]]
                            gxMap.locationPoint(point, zoom)
                        } else {
                            message.warning('无位置信息')
                        }

                    }
                    setTimeout(() => {
                        if (gxMap) {
                            let metinfo = Object.assign(new MetaInfo(), data);
                            gxMap.locationMetaInfo(metinfo)
                            gxMap.resize()
                        }
                    }, 220);
                }
            })
        }
    }

    onMapload = (gxMap) => {
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(gxMap);
        }
    }

    onQueryFeature = (geometry) => {
        let metaList = this.state.metaList
        let metaIds = metaList ? metaList.map(item => item.id) : null
        if(metaIds&&metaIds.length){
            PubSub.publish('queryFeature',{type:'meta',geometry: geometry,metaIds:metaIds})
        }else if(this.props.serviceItem){
            PubSub.publish('queryFeature',{type:'ser',geometry: geometry,serviceItem:this.props.serviceItem})
        }
        // this.props.dispatch({
        //     type: 'feature/featureQuery',
        //     geometry: geometry,
        //     // serviceId: this.props.serviceId,
        //     serviceItem: this.props.serviceItem,
        //     metaIds: metaIds
        // })
    }

    render() {
        let baseLayerMetaInfo = this.state.baseLayerMetaInfo
        let serviceType = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceType') : ""
        let serviceUrl = baseLayerMetaInfo ? baseLayerMetaInfo.getAttribute('serviceUrl') : ""
        const { mapId, url } = this.props
        const { gxMap, metaList, geometrys, serviceItem } = this.state
        return (
            <MapControl
                mapId={mapId || 'servicemap'}
                onLoad={this.onMapload}
                onQueryFeature={this.onQueryFeature}
            >
                <BaseMapLayer serviceType={serviceType.value} serviceUrl={serviceUrl.value}></BaseMapLayer>
                {gxMap && url && <UrlLayer url={url} />}
                {gxMap && metaList && metaList.map((metaInfo, index) => {
                    return (<MetaLayer key={metaInfo.id} metaInfo={metaInfo} layerIndex={metaInfo.layerIndex || index}></MetaLayer>)
                })}
                {gxMap && geometrys && geometrys.length > 0 && <FeatureLayer features={geometrys}></FeatureLayer>}
                {gxMap && serviceItem && <ServiceLayer serviceItem={serviceItem} />}
            </MapControl>
        );
    }
}

export default CommonMap;