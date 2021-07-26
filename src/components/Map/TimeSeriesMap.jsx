

import React from 'react'
// import { connect } from 'dva';

import MapControl from './MapControl'

import BaseMapLayer from './layer/BaseMapLayer'
import MetaLayer from './layer/MetaLayer'

import TimelineChart from './timelineChart'
// import './d3/timeline-chart.css'
import './timeline-chart.css'




class TimeSeriesMap extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            gxMap: null,

            timeline: null,

        }
    }
    componentDidMount() {
        let time = this.getTime([])
        if (this.state.timeline && time) {
            this.state.timeline.updateXAxis([], time.minDt, time.maxDt)
        }
    }
    componentWillUnmount() {
        window.onresize = null
        // this.props.dispatch({
        //     type: 'mapData/closeSelectList',
        // })
        // this.props.dispatch({
        //     type: 'mapData/setSelectTimeItem',
        //     item: null
        // })
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
        let showData = this.props.showData

        if (showData) {
            // this.props.dispatch({
            //     type: 'mapData/selectList',
            //     item: showData
            // })

            let geometry = JSON.parse(showData.geometry)
            if (geometry) {
                this.state.gxMap.locationGeometry(geometry)
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // let metaList = nextProps.mapData.get('selectList')
        // let selectTimeItem = nextProps.mapData.get('selectTimeItem')
        let metaList = nextProps.metaList
        let selectTimeItem = selectTimeItem
        if (metaList) {
            let time = this.getTime(metaList)
            if (this.state.timeline && time) {
                this.state.timeline.updateXAxis(this.getData(metaList), time.minDt, time.maxDt)
                this.state.timeline.updateData(this.getData(metaList, selectTimeItem))
            }

        }
    }
    getTime(list) {
        let minDt = new Date(2019, 0, 1)
        let maxDt = new Date();
        list.forEach((it, i) => {
            if (i === 0) {
                minDt = new Date(Number(it.productTime) - 1000 * 3600 * 24)
            }
            maxDt = new Date(Number(it.productTime) + 1000 * 3600 * 24)
        })
        return {
            minDt: minDt,
            maxDt: maxDt
        }
    }
    initD3 = (ele) => {
        if (ele) {
            let timeline = new TimelineChart(ele, this.clickPoint);
            this.setState({
                timeline: timeline,
            })
            window.onresize = () => {
                // let metaList = this.props.mapData.get('selectList')
                // let selectTimeItem = this.props.mapData.get('selectTimeItem')
                let metaList = this.props.metaList
                let selectTimeItem = this.props.selectTimeItem
                timeline.updateXAxis(this.getData(metaList, selectTimeItem))
            }
        }
    }
    clickPoint = (data) => {
        this.props.dispatch({
            type: 'mapData/setSelectTimeItem',
            item: data.metaInfo
        })
        let metaList = this.props.mapData.get('selectList')
        if (this.state.timeline) {
            this.state.timeline.updateData(this.getData(metaList, data.metaInfo))
        }
    }
    getData(metaList, clickItem) {
        let data = []
        if (metaList) {
            data = [{
                data: metaList.map(it => {
                    return {
                        type: TimelineChart.TYPE.POINT,
                        at: new Date(Number(it.productTime)),
                        metaInfo: it,
                        isSelect: clickItem && it.id === clickItem.id
                    }
                })
            }];
        }

        return data
    }

    render() {

        let baseLayerMetaInfo = this.props.baseLayerMetaInfo
        let serviceType = this.props.serviceType
        let serviceUrl = this.props.serviceUrl
        let mapId = this.props.mapId

        // let metaList = this.props.mapData.get('selectList')
        // let selectTimeItem = this.props.mapData.get('selectTimeItem')
        let selectTimeItem = this.props.selectTimeItem

        let obj = {
            zoomNotShow: this.props.zoomNotShow
        }
        return (
            <div className='brace-up' onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <MapControl
                    mapId={mapId}
                    obj={obj}
                    onLoad={this.onMapload}
                >
                    {baseLayerMetaInfo &&
                        <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                    }
                    {/* {metaList && metaList.map(metaInfo => {
                        return (<MetaLayer key={metaInfo.id} metaInfo={metaInfo}></MetaLayer>)
                    })} */}
                    {selectTimeItem && <MetaLayer key={selectTimeItem.id} metaInfo={selectTimeItem}></MetaLayer>}
                </MapControl>
                <div id='d3svg' ref={this.initD3} style={{ height: '70px', position: 'absolute', left: '8px', bottom: '25px', right: '43px', zIndex: 1100, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '3px' }}></div>
            </div>

        )
    }
}
// export default connect(state => ({
//     mapData: state.mapData,
    
// }))(TimeSeriesMap)
export default TimeSeriesMap