import React from 'react'

import { CommonMap, MultiwindowMap, RollerMap, TimeSeriesMap } from '../src'

// 感觉整个Map向是一个测试用的，如果粒度细的话，Map应该不在这个组件里出现，而是在业务系统，你考虑下，在优化下
// 可以放在example目录中进行测试，这些都是不提交到仓库中的
export default class Map extends React.Component {

    render() {
        const { url, isMapType, serviceType, serviceUrl } = this.props

        return <div>
            {isMapType === 'normal' && <CommonMap
                serviceType={serviceType}
                serviceUrl={serviceUrl}
                url={url}
            >
            </CommonMap>}

            {
                isMapType === 'timeSeries' && <TimeSeriesMap
                    url={url}
                    serviceType={serviceType}
                    serviceUrl={serviceUrl}

                ></TimeSeriesMap>
            }

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
                ></RollerMap>
            }
        </div>
    }
}