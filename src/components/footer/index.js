import React,{ Component } from "react";
import './index.less';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="footer">
        版权所有:DY-YAO（推荐谷歌浏览器，可以获得更加操作页面体验） 技术支持：dyyaoGit
      </div>
     );
  }
}
 
export default Footer;