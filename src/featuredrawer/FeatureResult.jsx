import React from 'react'
import moment from 'moment';

import { List, Collapse, Row, Col, Modal, Carousel, Icon, Button, } from 'antd';
// import {LeftOutlined, RightOutlined} from '@ant-design/icons';
// import { divIcon } from 'leaflet';
// import { actService } from '../../../../plugin/mapEditTool/service/index'
const { Panel } = Collapse;

const attributeObjs = {
    img: '图片',
    massifNum: '地块编号',
    name: '名称',
}

export default class FeatureResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            itemPic: [],
            current: 1,

            versionVisible: false,
            visibleData: null,

            selData: null,
        }
    }
    showModalVersion = (item) => {

        this.setState({
            selData: item
        }, () => {
            this.queryFeaVersion()
        })

    }
    handleCancelVersion = e => {
        this.setState({
            versionVisible: false,
        });
    };
    queryFeaVersion = () => {
        let selData = this.state.selData

        let params = {
            "pageNum": 1,
            "pageSize": 1000,
            "classObjectId": selData.from,
            "oid": selData.id,
            "branchId": 1,
            "loadEvent": true,
            "loadVersion": true
        }
        // actService.actQuery(params).then(res => {
        //     if (res.data.status === 200) {
        //         let data = res.data.data
        //         this.setState({
        //             visibleData: data,
        //             versionVisible: true,

        //         })
        //     }
        // })
    }
    showModal = (item) => {
        let arr = []
        if (item) {
            arr = item.value ? item.value.split(',') : []
        }
        this.setState({
            visible: true,
            itemPic: arr
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    next() {
        this.slider.slick.slickNext();
    }
    prev() {
        this.slider.slick.slickPrev();
    }
    nowIndex(e) {
        this.setState({
            current: e + 1
        })
    }
    getValue = (op) => {
        let value = ''
        if (op === 1) {
            value = '添加'
        } else if (op === 2) {
            value = '删除'
        } else if (op === 4) {
            value = '更新'
        }

        return value
    }
    render() {
        let list = this.props.list
        const that = this


        let versionVisible = this.state.versionVisible
        let visibleData = this.state.visibleData
        let visibleList = []
        // let total = 0
        if (visibleData) {
            visibleList = visibleData.items
            // total = visibleData.totalItems
        }
        return (<div>
            <Collapse accordion bordered={false} defaultActiveKey={['0']}>
                {list && list.map((it, i) => {
                    let name = getAttributeName(it)
                    let header = name ? name : i

                    let lists = []

                    for (let at in it.attributes) {
                        let att = it.attributes[at]
                        let obj = {
                            name: attributeObjs[at] ? attributeObjs[at] : at,
                            value: att,
                        }
                        if (at === 'massifNum') {
                            lists.unshift(obj)
                        } else {
                            lists.push(obj)
                        }

                    }




                    return <Panel header={header} key={i}>
                        <List
                            bordered
                            dataSource={lists}
                            renderItem={item => {
                                return (
                                    <List.Item style={{ margin: '0px', padding: '0px', width: '100%' }}>
                                        <Row >
                                            <Col span={8} style={{ padding: '5px', fontSize: '14px', borderRight: '1px solid #3B5176', borderBottom: '1px solid #3B5176' }}>{item.name}</Col>
                                            {
                                                item.name === '图片' ?
                                                    <Col span={16} style={{ padding: '5px', fontSize: '14px', borderLeft: '1px solid #3B5176' }}>
                                                        {
                                                            item.value ?
                                                                <span style={{ cursor: 'pointer', color: '#3078db' }} onClick={that.showModal.bind(this, item)}>图片查看</span>
                                                                : <span>暂无图片</span>
                                                        }
                                                    </Col> :
                                                    <Col span={16} style={{ padding: '5px', fontSize: '14px', borderLeft: '1px solid #3B5176' }}>{item.value}</Col>
                                            }

                                        </Row>

                                    </List.Item>
                                )
                            }}
                        />

                        {/* 暂无 */}
                        {/* {this.props.feaVersion && <Button type="primary" style={{ marginTop: 10 }} onClick={() => this.showModalVersion(it)}>
                            查看变更集
                        </Button>} */}
                    </Panel>
                })}

            </Collapse>

            <Modal
                footer={null}
                closable={false}
                wrapClassName='picture'
                visible={this.state.visible}
                onCancel={this.handleCancel}
                width={620}
            >
                <div className='model-title'>
                    {this.state.current + '/' + this.state.itemPic.length}
                </div>

                <Carousel ref={el => (this.slider = el)} className='pic-carousel' afterChange={(e) => { this.nowIndex(e) }}>
                    {
                        this.state.itemPic.map(it => <img height={690} src={this.props.imgUrl + '/' + it} alt='' />)
                    }
                </Carousel>

                {
                    this.state.itemPic.length > 1 && <>
                        <Icon onClick={this.prev.bind(this)}
                            className='icon' style={{ left: 0, }} type='left'></Icon>
                        <Icon onClick={this.next.bind(this)}
                            className='icon' style={{ right: 0, }} type='right'></Icon>
                    </>
                }

            </Modal>
            <Modal
                title="变更集"
                closable={false}
                visible={versionVisible}
                onOk={this.handleCancelVersion}
                onCancel={this.handleCancelVersion}
                footer={[
                    <Button key="back" onClick={this.handleCancelVersion}>
                        关闭
                    </Button>,

                ]}
            >
                <List
                    style={{
                        maxHeight: 300,
                        minHeight: 168,
                        overflowY: 'auto',
                        marginBottom: 10
                    }}
                    bordered
                    dataSource={visibleList}
                    renderItem={item => {
                        return (
                            <List.Item style={{ margin: '0px', padding: '2px 10px', width: '100%', display: 'inline-block', lineHeight: '20px', color: 'rgba(0, 0, 0, 0.85)' }}>
                                {moment(Number(item.version.vTime)).format('YYYY-MM-DD HH:mm:ss')} {this.getValue(item.operation)}
                            </List.Item>
                        )
                    }}
                />
            </Modal>

        </div>)
    }
}


function getAttribute(item, name) {
    let attributes = item.attributes

    for (let i in attributes) {
        let att = attributes[i]
        if (att && att.NAME === name) {
            return att
        }

    }


    // let result = attributes.filter(data => data.key === name)
    // if (result.length > 0) {
    //     return result[0]
    // }
    return null
}
function getAttributeName(item) {
    let name = getAttribute(item, 'name')
    let NAME = getAttribute(item, "NAME")


    if (name) {
        return name
    } else if (NAME) {
        return NAME
    }
    return null
}