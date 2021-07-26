import React from 'react'

import LeafletMap from '../LeafletMap'

class MapControl extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    initMap = element => {
        if (element) {
            let mapId = this.props.mapId || 'leafletMap'
            let obj = this.props.obj

            let gxMap = new LeafletMap(mapId,obj)
            this.setState({ gxMap })
            gxMap.resize()
            gxMap.onQueryFeature = (geometry, e) => {
                if (this.props.onQueryFeature) {
                    this.props.onQueryFeature(geometry, e)
                }
            }
            gxMap.getCenterPointer = (e) => {
                if (this.props.getCenterPointer) {
                    this.props.getCenterPointer(e)
                }
            }
            gxMap.onMouseMove = (e) => {
                if (this.props.onMouseMove) {
                    this.props.onMouseMove(e)
                }
            }
            gxMap.onMouseRight = (e) => {
                if (this.props.onMouseRight) {
                    this.props.onMouseRight(e)
                }
            }
            gxMap.onMouseDblclick = (e) => {
                if (this.props.onMouseDblclick) {
                    this.props.onMouseDblclick(e)
                }
            }
            gxMap.onMouseDown = (e) => {
                if (this.props.onMouseDown) {
                    this.props.onMouseDown(e)
                }
            }
            gxMap.onMouseUp = (e, geometry) => {
                if (this.props.onMouseUp) {
                    this.props.onMouseUp(e, geometry)
                }
            }


            if (this.props.onLoad) {
                this.props.onLoad(gxMap)
            }
        }
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (this.props.bounds === null && nextProps.bounds != null) {
    //         let gxMap = this.state.gxMap
    //         if (gxMap) {
    //             gxMap.getMap().fitBounds(nextProps.bounds, {
    //                 padding: [100, 100],
    //                 linear: true
    //             });
    //         }

    //     }
    // }
    render() {
        let mapId = this.props.mapId || 'leafletMap'

        return (<div id={mapId} className='brace-up' style={{ height: "100%", minHeight: '300px' }}
            ref={this.initMap}>
            {
                React.Children.map(this.props.children, (child) => {
                    if (child) {
                        return React.cloneElement(child, { gxMap: this.state.gxMap })
                    }
                    return null
                })
            }
        </div>)
    }
}

export default MapControl