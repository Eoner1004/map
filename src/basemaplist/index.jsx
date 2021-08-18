

import React from 'react'
// import { connect } from 'dva';
// import { imgUrl } from '../../../../service/common'
import { Dropdown, } from 'antd';
import './basemaplist.scss'
import initData from './init';
import PubSub from 'pubsub-js'
import MetaInfo from '../components/Map/MetaInfo'

function BaseMapCard(baseMapItem, mapId, imgUrl, onClick) {
    return (<div key={baseMapItem.id}
        style={{boxShadow:' 0 0 2px #aaa'}}
        className={baseMapItem.id === mapId ? 'layer-li dot click' : 'layer-li dot'}
        onClick={() => onClick(baseMapItem)}>
        {
            baseMapItem.icon ? <img
                alt={baseMapItem.name}
                src={imgUrl + '/' + baseMapItem.icon}
            /> : <span></span>
        }
        <div className='name dot basemap-name' style={{bottom:0}}>{baseMapItem.name}</div>
    </div>)
}

class BaseMapList extends React.PureComponent {

    constructor(props) {
        super(props)
        let baseMap = this.getBaseMap()
        this.state = {
            baseMap
        }
    }
    componentDidMount() {
        //初始化请求
        let server={
            axiosFn:this.props.axiosFn
        }
        initData.init(server)

        let obj = {
            pageNum: 1,
            pageSize: 24,
            imgType: "Service",
            pos: {
                id: 1
            }
        }
        let url = null
        let axiosFn = initData.getAxiosFn()
        if(this.props.datamgUrl){
            url = this.props.datamgUrl + "metainfo/retrieval"
        }
        if(url&&axiosFn){
            axiosFn.createAxios(axiosFn.getToken()).post(url, obj)
            .then(res=>{
                if (res.data.status === 200) {
                    let data = { ...res.data.data }
                    data.items.push({
                        id: '1',
                        name: '无'
                    })
                    let list = data.items ? data.items : []
        
                    let baseMap = localStorage.getItem('baseMap') || ''
                    if (!baseMap) {
                        localStorage.setItem('baseMap', JSON.stringify(list[0]))
                    }
                    this.setState({baseMapList: data})
                }
            })
        }
        
    }
    selectLayer(item) {
        //let meatInfo = Object.assign(new MetaInfo(), item)
        localStorage.setItem('baseMap', JSON.stringify(item))

        this.setState({
            baseMap: item
        })
        let baseLayerMetaInfo = Object.assign(new MetaInfo(), item)
        PubSub.publish('changeBaseMap',baseLayerMetaInfo)
    }
    getBaseMap() {
        let baseMap = localStorage.getItem('baseMap') || ''
        if (baseMap) {
            return JSON.parse(baseMap)
        }
        return ''
    }

    render() {
        // let baseMapList = this.props.baseMapDva.get('baseMapList')
        const {baseMapList} = this.state
        
        if (baseMapList) {
            let list = baseMapList.items ? baseMapList.items : []
            let baseMap = this.state.baseMap
            return (
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 500 }}>
                    <Dropdown overlay={
                        <div className='base-map-list cle' >
                            {list.map((item, i) => BaseMapCard(item, baseMap.id, this.props.imgUrl, this.selectLayer.bind(this)))}
                        </div>}
                        trigger={['click']}>
                        <div
                            className='layer-li dot' style={{ width: '96px', height: '72px', border: '3px solid #fff',borderRadius:4 }} >

                            {
                                baseMap.icon ? <img
                                    alt={baseMap.name}
                                    style={{ width: '100%', height: '100%',borderRadius:4 }}
                                    src={this.props.imgUrl + '/' + baseMap.icon}
                                /> : <span ></span>
                            }
                            <div className='dot basemap-name' title={baseMap.name}>{baseMap.name}</div>
                        </div>
                        {/* <Button type="primary" icon="picture"
                            style={{ position: "absolute", top: '10px', right: '10px', zIndex: 100 }}></Button> */}

                    </Dropdown>
                </div>
            )
        }
        return (<></>)
    }
}
export default BaseMapList