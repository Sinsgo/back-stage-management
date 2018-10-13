import React,{ Component } from "react";
import {Link} from 'react-router-dom';
import './index.less';

class NotMatch extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( 
        <div className="notmatch">
            <div className="title">
              Oh My God!!!
            </div>
            <div className="desc">
              <span>404</span>,没有找到你要的页面!
            </div>
          <ul>
            <li>或者你可以去</li>
            <li>
              <Link to="/admin/home">首页</Link>
            </li>
          </ul>
        </div>
     )
  }
}
 
export default NotMatch;