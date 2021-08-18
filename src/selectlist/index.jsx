import React from 'react'
// import MetainfoCards from '../../common/dataIcon/MetainfoCards'
import _ from 'lodash'

// import CustomIcon from '../../../customIcon'
import MetaInfo from '../components/Map/MetaInfo'
import PubSub from 'pubsub-js'

import { List, Icon, message } from 'antd';


class SelectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clickCard: null,
            notShowList:[],
            dragItemIndex: null,//拖动数据
            selectList:[]
        }
    }

    componentDidMount() {
        let that = this
        this.pubsub_selectclick = PubSub.subscribe('onRelatedClick', function (topic, item) {
            let newSelctList = !that.state.selectList?[]:[...that.state.selectList]
            let index = newSelctList.findIndex(it => it.id === item.id)
            if (index > -1) {
                newSelctList.splice(index, 1)
            } else {
                newSelctList.push(item)
            }
            let selectList_pro=newSelctList.map((it)=>{
                return{
                    ...it,
                    datamgUrl:that.props.datamgUrl
                }
            })
            that.setState({
                selectList: selectList_pro
            })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.pubsub_selectclick);
    }

    onClickCard(item) {

        this.setState({
            clickCard: item
        })
        if (item.obj.checkStatus !== 2) {
            return message.warning('矢量正在上传队列中，请稍候刷新再试')
        } else {
            if (!item.obj.geometry) {
                // message.warning('无位置信息')
                let attributes = _.get(item, 'obj.attributes', []);
                let centerData = attributes.find((it) => it.field.name === 'centerPoint')
                let centerPoint = centerData && centerData.value ? JSON.parse(centerData.value) : []
                if(centerPoint.length){
                    let zoomData = attributes.find((it) => it.field.name === 'zoom')
                    let zoom = zoomData && zoomData.value ? zoomData.value: 10

                    let point =[centerPoint[1],centerPoint[0]]
                    let gxMap = this.props.mapView.getGxMap();
                    gxMap.locationPoint(point,zoom)
                }else{
                    message.warning('无位置信息')
                }
               
            }
            if (this.props.onMetaLocation) {
                let metinfo = Object.assign(new MetaInfo(), item);

                this.props.onMetaLocation(metinfo)
            }
        }


    }

    clearSel(item, e) {
        e.preventDefault()
        e.stopPropagation()
        
        const  {selectList,notShowList} = this.state
        let newSelectList = selectList.filter(it => it.id !== item.id)
        let newNotShowList = notShowList.filter(it => it.id !== item.id)
        this.setState({
            selectList:newSelectList,
            notShowList:newNotShowList
        })
        PubSub.publish('closeSelect',item)
    }

    clearSelectModel(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({selectList:null})
        PubSub.publish('closeSelect',null)
    }
    getShow = (notShowList, item) => {
        let have = notShowList.find(it => it.id === item.id)
        if (have) {
            return true
        } else {
            return false
        }
    }
    showEye = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        let newList = [...this.state.notShowList]
        let index = newList.findIndex(it => it.id === item.id)
        if (index > -1) {
            newList.splice(index, 1)
        } else {
            newList.push(item)
        }
        this.setState({notShowList:newList})
        PubSub.publish('closeSelect',item)
    }
    onDragStart = (item, i) => {

        this.setState({
            dragItemIndex: i
        })

    }

    onDragOver = (item, i, event) => {

        event.persist()
        event.preventDefault();

    }
    onDrop = (item, i, event) => {

        event.persist()
        event.stopPropagation();  //阻止冒泡


        let dragItemIndex = this.state.dragItemIndex

        // let selectList = this.props.dataSelectList.get('selectList') || []

        // let newList = [...selectList]
        // let data = selectList[dragItemIndex]
        // newList.splice(dragItemIndex, 1)

        // newList.splice(i, 0, { ...data })


        // this.props.dispatch({
        //     type: 'dataSelectList/setSelectList',
        //     selectList: [...newList]
        // })
        // this.props.dispatch({
        //     type: 'dataSelectList/notShowList',
        //     item: data
        // })
        // setTimeout(() => {
        //     this.props.dispatch({
        //         type: 'dataSelectList/notShowList',
        //         item: data
        //     })
        // }, 100);

    }
    render() {

        // let selectList = this.props.dataSelectList.get('selectList')
        // let notShowList = this.props.dataSelectList.get('notShowList') || []
        const { selectList,notShowList } = this.state
        let clickCard = this.state.clickCard
        if(selectList&&selectList.length){
            return (
                <div className='data-selete-list'>
                    <div className='title'>选中列表
                    <Icon type="close" style={{ fontSize: 16, transform: 'translate(-10px, 6px)' }} onClick={this.clearSelectModel.bind(this)} />
                    </div>
                    <div className='list'>
                        {selectList && <List
                            dataSource={selectList}
                            renderItem={(item, index) => (
                                <List.Item className={clickCard && (clickCard.id === item.id) ? 'selectItem' : ''}>
                                    <div
                                        className='data-listitem cle'
                                        onClick={this.onClickCard.bind(this, item)}
    
                                        draggable={true}
                                        onDrop={(e) => this.onDrop(item, index, e)}
                                        onDragOver={(e) => this.onDragOver(item, index, e)}
                                        onDragStart={() => this.onDragStart(item, index)}
                                    >
                                        <div style={{
                                            float: 'left',
                                            paddingTop: "6px",
                                            paddingRight: '4px'
                                        }}>
                                            {!this.getShow(notShowList, item) && <Icon type="eye" style={{ fontSize: '16px', color: '#1890ff' }} onClick={(e) => this.showEye(e, item)} />}
                                            {this.getShow(notShowList, item) && <Icon type="eye-invisible" style={{ fontSize: '16px', color: '#ff4d4f' }} onClick={(e) => this.showEye(e, item)} />}
                                        </div>
    
                                        <div
                                         title={item.obj ? item.obj.name : ''}
                                         style={{
                                            float: 'left'
                                        }}>
                                            {/* <MetainfoCards item={item} fontSize={16}></MetainfoCards> */}
                                            <div className='dot' style={{ paddingLeft: 8, maxWidth: '120px', display: "inline-block", verticalAlign: 'top', paddingTop: "6px" }}>{item.obj ? item.obj.name : ''}</div>
                                        </div>
                                        <div style={{
                                            float: 'right',
                                            paddingTop: "6px",
                                            paddingRight: "4px"
                                        }}>
                                            <Icon type="minus-circle" style={{ fontSize: 16, color: 'red', }} onClick={this.clearSel.bind(this, item)} />
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />}
    
                    </div>
                </div >
            )
        }else{
            return <></>
        }
        
    }
}

export default SelectList