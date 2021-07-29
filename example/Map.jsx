import React from 'react'

import { CommonMap, MultiwindowMap, RollerMap, TimeSeriesMap } from '../src'

export default class Map extends React.Component {

    render() {
        const { url, isMapType, serviceType, serviceUrl } = this.props

        return <div>
            {isMapType === 'normal' &&
                <CommonMap
                    serviceType={serviceType}
                    serviceUrl={serviceUrl}
                    url={url}
                >
                </CommonMap>}

            {isMapType === 'timeSeries' &&
                <TimeSeriesMap
                    url={url}
                    serviceType={serviceType}
                    serviceUrl={serviceUrl}
                ></TimeSeriesMap>}

            {isMapType === 'multiwindow' &&
                <MultiwindowMap
                    url={url}
                    serviceType={serviceType}
                    serviceUrl={serviceUrl}
                ></MultiwindowMap>}

            {isMapType === 'roller' &&
                <RollerMap
                    url={url}
                    serviceType={serviceType}
                    serviceUrl={serviceUrl}
                ></RollerMap>}
        </div>
    }
}