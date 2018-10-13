import React,{ Component } from "react";
import {Link} from "react-router-dom";
import './index.less';
import {formatDate} from '../../utils';
import axios from 'axios';
// import {connect} from 'react-redux';
class Header extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    time: '2018-08-01 23:30:56',
    weather:''
  }
 
  getTime = () => {
    setInterval(() => {
        let unixDate = new Date().getTime()
        let timeStr = formatDate(unixDate)
        this.setState({
          time: timeStr
        })
    },1000)
  }
  getWeather = () => {
    axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res=>{
      let weather = res.data.data.forecast[0]
      console.log(res)
      let weatherStr = `${weather.low} ~ ${weather.high}  ${weather.fx} ${weather.fl}`
      this.setState({
        weather: weatherStr
      })
    })
  }
  componentWillMount() {
    this.getWeather()
    this.getTime()
  } 


  render() { 
    return ( 
      <div className="Header-wrap">
        <div className="user-info clearfix">
          <div className="flr">
            <Link to="/login">退出 </Link>
          </div>
          <div className="user-detail flr">
            欢迎,{''} <span className="username">张怡宁</span>
          </div>
        </div>
        <div className="weather-wrap clearfix ">
          <div className="breadcrumb fll">
                {/* {this.props.menuText.menuItemText} */}
          </div>
          <div className="weather flr clearfix">
            <div className="date fll">
                {this.state.time}
            </div>
            <div className="weather-datail fll">
                {this.state.weather}
            </div>
          </div>
        </div>
      </div>
     )
  }
}
 //connect 接受两个参数
 
 export default Header
 //connect( 
//   function mapStateToProps(state) {
//     return {
//       menuText:state.initialState
//     }
//   }
// )(Header);


 

          