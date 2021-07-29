

import React from 'react'
import L from 'leaflet'

import './leafletSide/layout.css'
import './leafletSide/range.css'
import './leafletSide/leaflet-side-by-side'

import MapControl from '../components/Map/MapControl'

import BaseMapLayer from '../components/Map/layer/BaseMapLayer'
import UrlLayer from '../components/Map/layer/UrlLayer'

class RollerMap extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            gxMap: null,


            sideMap: null,


            leftData: null,
            rightData: null,
        }
        this.leftLayer = null
        this.rightLayer = null
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        // this.props.dispatch({
        //     type: 'mapData/closeSelectList',
        // })
        this.closeRoller()
    }
    openRoller = () => {

        let map = this.state.gxMap.getMap()
        let sideMap = L.control.sideBySide(null, null).addTo(map);
        this.setState({
            sideMap: sideMap
        })


    }
    closeRoller = () => {
        let sideMap = this.state.sideMap
        if (sideMap) {
            sideMap.remove()
        }

    }
    onMapload = (gxMap) => {
        let mapId = this.props.mapId
        this.setState({ gxMap }, () => {
            this.openRoller()

        })
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

        let sideMap = this.state.sideMap
        let cX = event.clientX - 320

        let left = sideMap._divider.style.left
        let leftNum = left.replace('px', '')
        leftNum = Number(leftNum)

        // let showData = this.props.mapData.get('dragData')
        let showData = this.props.showData

        if (showData) {


            if (cX < leftNum) {
                this.setState({
                    leftData: showData
                })
                this.location(showData)
            } else {
                this.setState({
                    rightData: showData
                })
                this.location(showData)
            }

            // let leftData = this.state.leftData
            // let rightData = this.state.rightData
            // if (!leftData) {
            //     this.setState({
            //         leftData: showData
            //     })
            //     this.location(showData)
            // } else if (!rightData) {
            //     this.setState({
            //         rightData: showData
            //     })
            //     this.location(showData)

            // }

        }
    }
    location = (showData) => {
        let geometry = JSON.parse(showData.geometry)
        let gxMap = this.state.gxMap

        if (geometry && gxMap) {
            gxMap.locationGeometry(geometry)
        }
    }
    onLeftLayer = (layer) => {
        this.leftLayer = layer
        // this.openRoller()
        let sideMap = this.state.sideMap
        if (sideMap) {
            sideMap.setLeftLayers(this.leftLayer)
        }
    }
    onRightLayer = (layer) => {
        this.rightLayer = layer
        let sideMap = this.state.sideMap
        if (sideMap) {
            sideMap.setRightLayers(this.rightLayer)
        }

    }
    closeItem = (num) => {
        if (num === 1) {
            this.setState({
                leftData: null
            })
            this.onLeftLayer(null)
        } else {
            this.setState({
                rightData: null
            })
            this.onRightLayer(null)
        }
    }
    render() {

        // let baseLayerMetaInfo = this.props.baseLayerMetaInfo
        let url = this.props.url
        let serviceType = this.props.serviceType
        let serviceUrl = this.props.serviceUrl
        let mapId = this.props.mapId
        let sideMap = this.state.sideMap

        // let leftData = this.state.leftData
        // let rightData = this.state.rightData
        let leftData = url[0]
        let rightData = url[1]
        return (
            <div className='brace-up rollermap' onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <MapControl
                    mapId={mapId}
                    onLoad={this.onMapload}
                >
                    {serviceType && serviceUrl &&
                        <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                    }

                    {/* {leftData && <MetaLayer onRef={this.onLeftLayer} key={leftData.id} metaInfo={leftData}></MetaLayer>}
                    {rightData && <MetaLayer onRef={this.onRightLayer} key={rightData.id} metaInfo={rightData}></MetaLayer>} */}
                    {leftData&& sideMap && <UrlLayer onRef={this.onLeftLayer} key={1} url={leftData}></UrlLayer>}
                    {rightData&& sideMap  && <UrlLayer onRef={this.onRightLayer} key={2} url={rightData}></UrlLayer>}
                </MapControl>


                <div className='roller-title-t'>
                    <div
                        title={leftData ? leftData.name : '无'}
                    >
                        左侧：
                        <div
                            className='dot'
                            style={{ display: 'inline-block', maxWidth: '140px' }}>
                            {leftData ? leftData.name : '无'}
                        </div>
                        {/* {leftData && <Icon type="close" onClick={() => this.closeItem(1)} />} */}
                    </div>
                    <div
                        title={rightData ? rightData.name : '无'}
                    >
                        右侧：
                        <div
                            className='dot'
                            style={{ display: 'inline-block', maxWidth: '140px' }}>
                            {rightData ? rightData.name : '无'}
                        </div>
                        {/* {rightData && <Icon type="close" onClick={() => this.closeItem(2)} />} */}
                    </div>
                </div>

                {/* {leftData && <div className='roller-title roller-title-1'>
                    {leftData.name}<Icon type="close" onClick={() => this.closeItem(1)} />
                </div>}
                {rightData && <div className='roller-title roller-title-2'>
                    {rightData.name}<Icon type="close" onClick={() => this.closeItem(2)} />
                </div>} */}
            </div>

        )
    }
}
// export default connect(state => ({
//     mapData: state.mapData,

// }))(RollerMap)
export default RollerMap