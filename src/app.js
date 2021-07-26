import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/leaflet/dist/leaflet.css'
import { Map } from './components';

function App() {
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setUrl(value)
    }
  }
  const address = 'http://10.16.28.4:8082/datamg-server/datamg/services/preview?crs=EPSG:3857&l={z}&x={x}&y={y}&metaId=1361517649965056'
  const [url, setUrl] = useState(null)
  const [value, setValue] = useState('');
  const [type, setType] = useState('normal');

  return (
    <div>
      <div>
        <input type="radio" name="type" value="normal" checked={type==="normal"?true:false} onChange={()=>{setType('normal')}}/>普通预览
        <input type="radio" name="type" value="multiwindow" checked={type==="multiwindow"?true:false} onChange={()=>{setType('multiwindow')}}/>四窗预览
        <input type="radio" name="type" value="roller" checked={type==="roller"?true:false} onChange={()=>{setType('roller')}}/>卷帘预览
        <input type="radio" name="type" value="timeSeries" checked={type==="timeSeries"?true:false} onChange={()=>{setType('timeSeries')}}/>多期影像
      </div>

      {type==="normal"&&<input value={value} onKeyDown={(e) => { onEnter(e) }} onChange={(e) => { setValue(e.target.value) }}></input>}

      <Map url={url} isMapType={type} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));