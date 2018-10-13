import React,{ Component } from "react";
import HeaderDemo from '../../components/header/headerDemo';
import {Card} from 'antd';
import './details.less';
import axios from '../../axios';


class DetailDemo extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    this.getData()
  }
  
  
  getData=()=>{
    const {detailid} = this.props.match.params
    axios.get('./order/detail',{id:detailid}).then(res=>{
      if(res.code == 0){
        this.initMap(res.result)
      }
    })
  }

  initMap =(result)=>{ //初始化地图
     const BMap = window.BMap
     this.map = new BMap.Map("bmap-container"); 
     this.addControl();
     this.drawPolyline(result.position_list);
     this.drawServiceArea(result.area);
  }

  //添加控件
  addControl =()=>{
    const BMap = window.BMap
    const map = this.map
    map.addControl(new BMap.NavigationControl({
      anchor:window.BMAP_ANCHOR_TOP_RIGHT
    }))
    map.addControl(new BMap.NavigationControl({
      anchor:window.BMAP_ANCHOR_TOP_RIGHT
    }))

  }
  //绘制折线点
  drawPolyline=(position_list)=>{
    const BMap = window.BMap
    const map = this.map
    let startPoint = position_list[0]
    let endPoint = position_list[position_list.length-1]
    let startBmapPoint = new BMap.Point(startPoint.lon,startPoint.lat)//绘制一个百度的点
    let endBmapPoint = new BMap.Point(endPoint.lon,endPoint.lat)//绘制一个百度的结束点

    let startmarker = new BMap.Marker(startBmapPoint);
    let endmarker = new BMap.Marker(endBmapPoint);
    map.addOverlay(startmarker); //起始
    map.addOverlay(endmarker); //结束
    map.centerAndZoom(startBmapPoint, 11); //设置地图中心点



    var polyline = new BMap.Polyline(position_list.map(point=>{
      return new BMap.Point(point.lon,point.lat)
    }),
    {strokeColor:"#1869ad", strokeWeight:3, strokeOpacity:1}
    );
    map.addOverlay(polyline);

  }
  
  //绘制服务区
  drawServiceArea = (area)=>{
    const BMap = window.BMap
    const map = this.map
    let polygon = new BMap.Polygon(area.map(point => new BMap.Point(point.lon,point.lat)),
      {
        strokeColor:'#ff0000',
        strokeWeight:6,
        fillColor:'#ff6700',
        fillOpacity:0.5
      }
    )
    map.addOverlay(polygon);
  }

  render() { 
    return ( 
      <div className="detail-demo">
         <HeaderDemo></HeaderDemo>
         <Card>
            <div className="bmap-wrap" id="bmap-container"></div>
         </Card>
      </div>
     );
  }
}
 
export default DetailDemo;