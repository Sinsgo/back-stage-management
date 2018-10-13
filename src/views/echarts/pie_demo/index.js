import React,{ Component } from "react";
import echarts from 'echarts/lib/echarts';// 引入 echarts 主模块。
import  'echarts/lib/chart/pie';//引入饼图
import 'echarts/lib/component/legend';
import EchartsReact from 'echarts-for-react';
// import echartsReact from '../themeLigth';


import {Card} from 'antd'
class PieDemo extends Component {
  constructor(props) {
    super(props);
  }
  // componentWillMount(){
  //   echarts.reginsterTheme('huhu',echartsReact)
  // }
  Pie1 = () =>{
    return{
       title : {
        text: '用户骑行订单',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: '20',
        top:'20',
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    series : [
        {
            name: '骑行订单',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:3000, name:'周一'},
                {value:5000, name:'周二'},
                {value:8000, name:'周三'},
                {value:4000, name:'周四'},
                {value:1233, name:'周五'}, 
                {value:10000, name:'周六'}, 
                {value:333, name:'周日'}, 
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    }
  };
        Pie2 = () =>{
          return{
            title : {
              text: '用户骑行订单',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              right: '20',
              top:'20',
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          series : [
              {
                  name: '骑行订单',
                  type: 'pie',
                  radius : ['50%','70%'] ,
                  center: ['50%', '60%'],
                  data:[
                      {value:3000, name:'周一'},
                      {value:5000, name:'周二'},
                      {value:8000, name:'周三'},
                      {value:4000, name:'周四'},
                      {value:1233, name:'周五'}, 
                      {value:10000, name:'周六'}, 
                      {value:333, name:'周日'}, 
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
          }
        };

  render() { 
    return ( 
      <div>
        <Card
          title="饼状图1"
        >
          <EchartsReact option={this.Pie1()}></EchartsReact>
        </Card>
        <Card
          title="饼状图2"
        >
          <EchartsReact option={this.Pie2()}></EchartsReact>
        </Card>
      </div>
     );
  }
}
 
export default PieDemo;  