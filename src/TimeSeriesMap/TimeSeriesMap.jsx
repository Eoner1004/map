

import React from 'react'

import MapControl from '../components/Map/MapControl'

import BaseMapLayer from '../components/Map/layer/BaseMapLayer'
import UrlLayer from '../components/Map/layer/UrlLayer'

import TimelineChart from './timelineChart'
import './timeline-chart.css'

import moment from 'moment'


class TimeSeriesMap extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            gxMap: null,
            timeline: null,
            selectTimeItem:null
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

        let showData = this.props.showData

        if (showData) {
            let geometry = JSON.parse(showData.geometry)
            if (geometry) {
                this.state.gxMap.locationGeometry(geometry)
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // if(this.props.metaList.length!==nextProps.metaList.length){
            let metaList = nextProps.metaList
            if (metaList) {
                let time = this.getTime(metaList)
                if (this.state.timeline && time) {
                    this.state.timeline.updateXAxis(this.getData(metaList), time.minDt, time.maxDt)
                    this.state.timeline.updateData(this.getData(metaList, null))
                }
    
            // }
        }
    }
    getTime(list) {
        let minDt = new Date(2019, 0, 1)
        let maxDt = new Date();
        list.forEach((it, i) => {
            if (i === 0) {
                minDt = new Date(Number(Number(moment(it.productTime).unix())) - 1000 * 3600 * 24)
            }
            maxDt = new Date(Number(Number(moment(it.productTime).unix())) + 1000 * 3600 * 24)
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
                let metaList = this.props.metaList
                let selectTimeItem = metaList[0]
                timeline.updateXAxis(this.getData(metaList, selectTimeItem))
            }
        }
    }
    clickPoint = (e) => {
        let data = e.target.__data__

        const {metaList} = this.props
        this.setState({selectTimeItem:data.metaInfo})

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
                        at: new Date(Number(moment(it.productTime).unix())),
                        metaInfo: it,
                        isSelect: clickItem && it.id === clickItem.id
                    }
                })
            }];
        }

        return data
    }

    render() {

        let serviceType = this.props.serviceType
        let serviceUrl = this.props.serviceUrl
        let mapId = this.props.mapId

        let selectTimeItem = this.state.selectTimeItem
        let obj = {
            zoomNotShow: true,
            notShowZoomslider: true,
        }
        return (
            <div className='brace-up' onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                <MapControl
                    mapId={mapId}
                    obj={obj}
                    onLoad={this.onMapload}
                >
                    {serviceType && serviceUrl &&
                        <BaseMapLayer serviceType={serviceType} serviceUrl={serviceUrl}></BaseMapLayer>
                    }

                    {selectTimeItem && <UrlLayer key={selectTimeItem.id} url={selectTimeItem.url}></UrlLayer>}
                </MapControl>
                <div id='d3svg' ref={this.initD3} style={{ height: '70px', position: 'absolute', left: '8px', bottom: '25px', right: '8px', zIndex: 1100, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '3px' }}></div>
            </div>

        )
    }
}
// export default connect(state => ({
//     mapData: state.mapData,
    
// }))(TimeSeriesMap)
export default TimeSeriesMap