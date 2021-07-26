

import React from 'react'
// import { connect } from 'dva';

import MapControl from './MapControl'

import BaseMapLayer from './layer/BaseMapLayer'
import MetaLayer from './layer/MetaLayer'


// import { Icon } from 'antd';



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

        // let showData = this.props.mapData.get('dragData')
        let showData = {}
        let showDataList = [...this.state.showDataList]
        if (showData) {
            let newShowDataList = showDataList.filter(it => it.id !== showData.id)
            newShowDataList.push(showData)
            this.setState({
                showDataList: newShowDataList
            })
            let geometry = JSON.parse(showData.geometry)
            if (geometry) {
                this.state.gxMap.locationGeometry(geometry)
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

        let baseLayerMetaInfo = this.props.baseLayerMetaInfo
        let serviceType = this.props.serviceType
        let serviceUrl = this.props.serviceUrl
        let showDataList = this.state.showDataList
        let mapId = this.props.mapId
        let styleObj = this.props.styleObj
        let clearStyle = this.props.clearStyle


        let obj = {
            zoomNotShow: this.props.zoomNotShow,
            notShowZoomslider: this.props.notShowZoomslider,
        }

        let mouseTop = this.props.mouseTop-15 || 20
        let mouseleft = this.props.mouseleft-15 || 20
        let haveMouse = this.props.haveMouse
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
                    {baseLayerMetaInfo &&
                        <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                    }
                    {
                        showDataList && showDataList.length > 0 && showDataList.map(it => <MetaLayer key={it.id} metaInfo={it}></MetaLayer>)
                    }
                    {/* {showData && <MetaLayer key={showData.id} metaInfo={showData}></MetaLayer>} */}

                </MapControl>
                <div style={Object.assign({ position: 'absolute', zIndex: '1200', backgroundColor: '#fff', borderRadius: '3px' }, clearStyle)}>
                    {/* <Button size='small' onClick={this.clearData}>清空</Button> */}
                    {showDataList && showDataList.length > 0 && showDataList.map(it => <div key={it.id} className='cle' style={{ padding: '2px' }}>
                        <div className='dot' style={{ width: '100px', float: 'left', lineHeight: '26px' }} title={it.name}>{it.name}</div>
                        {/* <Icon type="close" className='hover-icon' style={{ float: 'right', marginTop: '6px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => this.closeItem(it)} /> */}
                    </div>)}
                </div>
                {/* {haveMouse !== mapId && <Icon type="plus" style={{ position: 'absolute', top: mouseTop, left: mouseleft, zIndex: 2000, fontSize: '30px', color: '#00ff00' }} />} */}
            </div>

        )
    }
}
// export default connect(state => ({
//     mapData: state.mapData,

// }))(MultiwindowMap)

export default MultiwindowMap