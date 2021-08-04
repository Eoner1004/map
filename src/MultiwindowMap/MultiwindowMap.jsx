

import React from 'react'

import MapControl from '../components/Map/MapControl'

import BaseMapLayer from '../components/Map/layer/BaseMapLayer'
import UrlLayer from '../components/Map/layer/UrlLayer'
import MetaLayer from '../components/Map/layer/MetaLayer'

import { Icon } from 'antd';

class MultiwindowMap extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            gxMap: null,
            showDataList: [],
            haveMouse: false
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.setState({
            showDataList: []
        })
    }
    clearData = () => {
        this.setState({
            showDataList: []
        })
    }
    onMapload = (gxMap) => {
        let mapId = this.props.mapId
        this.setState({ gxMap })
        if (this.props.onMapload) {
            this.props.onMapload(gxMap, mapId);
        }
    }
    onDragOver(event) {

        event.persist()
        event.preventDefault();

    }
    onDrop = (event) => {
        event.persist()
        event.stopPropagation();  //阻止冒泡

        let showData = this.props.dragData
        let showDataList = [...this.state.showDataList]
        if (showData) {
            let newShowDataList = showDataList.filter(it => it.id !== showData.id)
            newShowDataList.push(showData)
            this.setState({
                showDataList: newShowDataList
            })
            let geometry = null
            let point = null
            let zoom = null
            if(showData.geometry){
                geometry = JSON.parse(showData.geometry)
            }else if(showData.attributes){
                showData.attributes.forEach(it=>{
                    if(it.field.name==='centerPoint'){
                        let centerPoint=JSON.parse(it.value)
                        point=[centerPoint[1],centerPoint[0]]
                    }else if(it.field.name==='zoom'){
                        zoom=it.value
                    }
                })
            }
            if (geometry) {
                this.state.gxMap.locationGeometry(geometry)
            }else if(point&&zoom){
                this.state.gxMap.locationPoint(point,zoom)
            }
        }
    }
    closeItem = (item) => {
        let showDataList = [...this.state.showDataList]
        let newShowDataList = showDataList.filter(it => it.id !== item.id)
        this.setState({
            showDataList: newShowDataList
        })

    }
    onMouseMove = (e) => {
        let mapId = this.props.mapId

        if (this.props.onMouseMove) {
            this.props.onMouseMove(e, mapId)
        }
    }
    render() {
        const {dragData,serviceType,serviceUrl,mapId,styleObj} = this.props

        let obj = {
            zoomNotShow: this.props.zoomNotShow,
            notShowZoomslider: this.props.notShowZoomslider,
        }

        let mouseTop = this.props.mouseTop-15 || 20
        let mouseleft = this.props.mouseleft-15 || 20
        let haveMouse = this.props.haveMouse
        let showDataList = this.state.showDataList.length?this.state.showDataList:this.props.showDataList

        return (
            <div
                style={
                    Object.assign({
                        position: 'absolute'
                    }, styleObj)
                }
                onDrop={this.onDrop.bind(this)}
                onDragOver={this.onDragOver.bind(this)}>
                <MapControl
                    mapId={mapId}
                    // bounds={bounds}
                    obj={obj}
                    onLoad={this.onMapload}
                    onMouseMove={this.onMouseMove}
                >
                    {serviceType && serviceUrl &&
                        <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                    }
                    {
                        dragData&&showDataList && showDataList.length > 0 && showDataList.map(it => <MetaLayer key={it.id} metaInfo={it}></MetaLayer>)
                    }
                    {/* {   dragData&&showData && <MetaLayer key={showData.id} metaInfo={showData}></MetaLayer>} */}
                    {
                        !dragData&&showDataList && typeof(showDataList)!=='string' && showDataList.length > 0 && showDataList.map((it,index) => <UrlLayer key={index} url={it}></UrlLayer>)
                    }
                </MapControl>
                {/* <div style={Object.assign({ position: 'absolute', zIndex: '1200', backgroundColor: '#fff', borderRadius: '3px' }, clearStyle)}> */}
                    {/* <Button size='small' onClick={this.clearData}>清空</Button> */}
                    {/* {showDataList && typeof(showDataList)!=='string' && showDataList.length > 0 && showDataList.map((it,id) => <div key={id} className='cle' style={{ padding: '2px' }}>
                        <div className='dot' style={{ width: '100px', float: 'left', lineHeight: '26px' }} title={it.name}>{it.name}</div>
                        <Icon type="close" className='hover-icon' style={{ float: 'right', marginTop: '6px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => this.closeItem(it)} />
                    </div>)} */}
                {/* </div> */}
                {haveMouse !== mapId && <Icon type="plus" style={{ position: 'absolute', top: mouseTop, left: mouseleft, zIndex: 2000, fontSize: '30px', color: '#00ff00' }} />}
            </div>

        )
    }
}
// export default connect(state => ({
//     mapData: state.mapData,

// }))(MultiwindowMap)

export default MultiwindowMap