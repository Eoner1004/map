import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/leaflet/dist/leaflet.css'
import Map from './Map';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import '../node_modules/antd/dist/antd.css';

let timeList = []

function App() {
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setUrl(value)
    }else if(e==='button'){
      if(value&&productTime){
        timeList.push({productTime,url:value,id:timeList.length+1})
        setValue('')
        setProductTime(undefined)
        setUrl(timeList)
      }
    }
  }
  const changeType = (val) =>{
    setType(val)
    if(val==='normal'){
      if(value[0]&&value.length){
        setValue(value[0])
        setUrl(value[0])
      }else{
        setValue('')
        setUrl(null)
      }
    }else if((val==='multiwindow'||val==='roller')){
      if(value&&typeof(value)==='string'){
        setValue([value])
        setUrl([value])
      }else if(!value||value.length===0){
        setValue([''])
        setUrl([])
      }
    }else if(val==='timeSeries'){
      setValue([])
      setUrl([])
    }
  }
  const multiChange = (val,index)=>{
    let arr = [...value]
    arr[index]=val
    setValue(arr)
  }
  const timesChange = (val,name) => {
    if(name==='url'){
      setValue(val)
    }else{
      setProductTime(val)
    }
  }
  
  const dateFormat = 'YYYY/MM/DD';
  const [url, setUrl] = useState( ['http://10.16.28.4:8082/datamg-server/datamg/services/preview?crs=EPSG:3857&l={z}&x={x}&y={y}&metaId=1361517649965056',
  'http://10.16.28.4:8082/datamg-server/datamg/services/preview?crs=EPSG:3857&l={z}&x={x}&y={y}&metaId=1379939962961984',
  ])
  const [value, setValue] = useState('');
  const [productTime, setProductTime] = useState(undefined);
  const [type, setType] = useState('roller');
  const [basemMapType, setBasemMapType] = useState('xyz');
  const [basemMapUrl, setBasemMapUrl] = useState('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
console.log(url)
  return (
    <div>
      <div style={{zIndex:999,position:'absolute',background:'white',padding:'8px 8px'}}>
        <div>
          <input type="radio" name="type" value="normal" checked={type === "normal" ? true : false} onChange={(e) =>changeType(e.target.value)} />普通预览
          <input type="radio" name="type" value="multiwindow" checked={type === "multiwindow" ? true : false} onChange={(e) =>changeType(e.target.value) } />四窗预览
          <input type="radio" name="type" value="roller" checked={type === "roller" ? true : false} onChange={(e) =>changeType(e.target.value)} />卷帘预览
          <input type="radio" name="type" value="timeSeries" checked={type === "timeSeries" ? true : false} onChange={(e) =>changeType(e.target.value)} />多期影像
        </div>
        底图类型：<input value={basemMapType} onChange={(e) => (setBasemMapType(e.target.value))} />
        底图地址：<input value={basemMapUrl} onChange={(e) => (setBasemMapUrl(e.target.value))} />

        <div>
          {type === "normal" && <input value={value} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { setValue(e.target.value) }}></input>}
          {type === "multiwindow" && <><input value={value[0]||''} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,0) }}></input>
          <input value={value[1]||''} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,1) }}></input>
          <input value={value[2]||''} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,2) }}></input>
          <input value={value[3]||''} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,3) }}></input></>}
          {type === "roller" && <><input value={value[0]} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,0) }}></input>
          <input value={value[1]} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { multiChange(e.target.value,1) }}></input></>}
          {type === "timeSeries" && <><input type='datetime' value={value||''} onChange={(e) => { timesChange(e.target.value,'url') }}></input>
          <DatePicker  onChange={(date,dateString) => { timesChange(moment(dateString, dateFormat),'productTime') }} value={productTime} format={dateFormat} getCalendarContainer={triggerNode => triggerNode.parentNode}/>
          <Button onClick={() => { onEnter('button') }} >添加</Button> </>}
        </div>
      </div>

      <Map url={url} isMapType={type} serviceType={basemMapType} serviceUrl={basemMapUrl} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));