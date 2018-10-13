import React,{ Component } from "react";
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import './index.less';
// import {connect} from 'react-redux';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class NavLeft extends Component {
  // clickMenuItem = ({item,key,keyPath}) =>{
  //   const text = item.props.children.props.children
  //   console.log(this.props.dispatch({type:'CHANGE_MENU_ITEM',text}))
  // };


  render() { 
    return ( 
      <div className="nav-left">
          <Menu mode="vertical" theme="dark">
            <MenuItem key="/admin/home">
               <Link to="/admin/home">首页</Link>
            </MenuItem>
            <SubMenu key="/admin/order" title="订单管理">
              {/* <MenuItem>
                <Link to="/admin/order">订单管理</Link>
              </MenuItem> */}
              <MenuItem>
                <Link to="/admin/order_demo">订单管理demo</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu key="跳转" title="图例">
              <MenuItem key="/admin/echarts/pie_demo">
                <Link to="/admin/echarts/pie_demo">饼状图demo</Link>
              </MenuItem>
              <MenuItem>
                <Link to="">条形图</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
      </div>
     )
  }
}
 
export default NavLeft
// connect(
//  null,
// )(NavLeft);
