import React from 'react'
import { Drawer } from 'antd';
import initData from './init';
import PubSub from 'pubsub-js'
import FeatureResult from './FeatureResult'
import axios from 'axios'

class FeatureQueryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            featureList: []
        }
    }

    componentDidMount() {
        let server = {
            axiosFn: this.props.axiosFn
        }
        initData.init(server)
        let axiosFn = initData.getAxiosFn()
        let url = null
        if (this.props.datamgUrl) {
            url = this.props.datamgUrl + "feature/query"
        }

        //订阅元信息要素监听事件
        this.pubsub_queryfeature = PubSub.subscribe('queryFeature', (topic, obj) => {
            let geometry = obj.geometry
            let params = {
                geoJson: JSON.stringify(geometry),
                isLoadGeometry: true
            }
            if (url) {

                if (obj.type === 'meta' && obj.metaIds && obj.metaIds.length) {
                    let list = [...obj.metaIds]
                    let funcList = []
                    for (let i = 0; i < list.length; i++) {
                        let obj = { ...params }
                        obj.fromIds = [list[i]]
                        obj.classObjectId = list[i]
                        funcList.push(axiosFn.createAxios(axiosFn.getToken()).post(url, obj))
                    }
                    axios.all(funcList).then(resList => {
                        let dataList = []
                        for (let q = 0; q < resList.length; q++) {
                            let res = resList[q]
                            if (res.data.status === 200) {
                                let data = res.data.data
                                if (data.items && data.items.length > 0) {
                                    dataList = [...dataList, ...data.items]
                                }
                            }
                        }
                        if (dataList && dataList.length) {
                            let geometrys = dataList.map(feature => {
                                return JSON.parse(feature.geom)
                            })
                            PubSub.publish('featureGeometry', geometrys)
                            this.setState({
                                featureList: dataList
                            })
                        } else {
                            PubSub.publish('featureGeometry', [])
                            this.setState({
                                featureList: []
                            })
                        }
                    })
                } else if (obj.type === 'ser' && obj.serviceItem) {
                    let serviceIds = [];
                    serviceIds.push(obj.serviceItem.id)
                    params.serviceIds = serviceIds;
                    axiosFn.createAxios(axiosFn.getToken()).post(url, params).then(res => {
                        if (res.data.status === 200) {
                            let data = res.data.data
                            if (data.items && data.items.length > 0) {
                                let geometrys = data.items.map(feature => {
                                    return JSON.parse(feature.geom)
                                })
                                PubSub.publish('featureGeometry', geometrys)
                                this.setState({
                                    featureList: data.items
                                })
                            } else {
                                PubSub.publish('featureGeometry', [])
                                this.setState({
                                    featureList: []
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_queryfeature);
    }

    onClose = () => {
        this.setState({ featureList: [] })
        PubSub.publish('featureGeometry', [])
    }
    render() {
        // let featureList = this.props.feature.get('featureList')
        const { imgUrl } = this.props
        const { featureList } = this.state
        let visible = featureList && featureList.length !== 0


        return (<Drawer
            className='feature-sttr'
            title="属性"
            bodyStyle={{ padding: '0px' }}
            onClose={this.onClose}
            visible={visible}
            mask={false}
            width={400}>
            <FeatureResult imgUrl={imgUrl} list={featureList} feaVersion={this.props.feaVersion}></FeatureResult>
        </Drawer>)
    }

}

export default FeatureQueryView