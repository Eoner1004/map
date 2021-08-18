

import React from 'react'
// import CustomIcon from '../../../../customIcon'
import { Icon } from 'antd';
import PubSub from 'pubsub-js'

class LegendView extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            serviceItem:null
        }
    }
    componentDidMount() {
        //订阅服务
        this.pubsub_serviceitem = PubSub.subscribe('setServiceItem', (topic, serviceItem)=>{
            this.setState({
                serviceItem
            })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_serviceitem);
    }

    openImg = (imgUrl) => {
        this.setState({
            visible: true
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        let time = new Date().getTime()

        const {serviceItem} = this.state

        if (serviceItem && serviceItem.serviceType===2) {
            let imgUrl = `${this.props.datamgUrl}services/getLegend?id=${serviceItem.id}&time=${time}`
            return (
                <div style={{ position: 'absolute', bottom: '30px', right: '45px', zIndex: 1000, backgroundColor: '#fff', borderRadius: '3px' }}>
                    {/* <img style={{ border: '2px solid #fff', borderRadius: '3px', width: 120, maxHeight: 50, cursor: 'pointer' }} onClick={() => this.openImg(imgUrl)} title="查看大图" src={imgUrl} alt="" /> */}
                    {
                        this.state.visible ?
                            <div>
                                <Icon type="close" style={{ float: 'right', cursor: 'pointer', fontSize: 14, margin: 8 }} onClick={this.handleCancel} />
                                <img style={{ border: '2px solid #fff', borderRadius: '3px', }} src={imgUrl} alt="" />
                            </div> :
                            <div onClick={this.openImg} style={{ fontSize: '14px', border: '1px solid #ccc', cursor: 'pointer', width: 60, textAlign: 'center', padding: 6 }}>
                                {/* <CustomIcon type='iconbianzu2'></CustomIcon> */}
                                图例</div>
                    }

                </div>
            )
        }
        return (<></>)
    }
}
export default LegendView