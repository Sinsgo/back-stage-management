import React,{ Component } from "react";
import './headerDemo.less';
import {Link} from "react-router-dom";

class HeaderDmeo extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="header-demo-warp">
            <div className="warp-lf fll">
              <h1>共享单车后台系统</h1>
            </div>
            <div className="warp-rt flr">
              <span className="username">
                欢迎，小龙女
              </span>
              <span className="logout">
                <Link to='/common/login'>退出</Link>
              </span>
            </div>
        
      </div>
     );
  }
}
 
export default HeaderDmeo;