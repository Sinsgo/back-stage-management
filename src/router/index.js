import React,{ Component } from "react";
import { HashRouter, Route, Switch} from "react-router-dom";
import Home from "../views/home";
import Admin from "../views/admin";
import NotMatch from "../views/notMatch";
import OrderDemo from "../views/order_demo";
import DetailDemo from "../views/order_demo/details";
import PieDemo from "../views/echarts/pie_demo";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return ( 
     <HashRouter>
        <div>
          <Switch>
           <Route path="/common/order_demo/details/:detailid" component={DetailDemo}></Route>
            <Route path='/' render={()=>
             <Admin>
               <Switch>
                <Route  path='/admin/home' component={Home}></Route>
                <Route  path='/admin/order_demo' component={OrderDemo}></Route>
                <Route  path='/admin/echarts/pie_demo' component={PieDemo}></Route>
                <Route component={NotMatch}></Route>
               </Switch>
             </Admin>
            }></Route>
            <Route component={NotMatch}></Route>
          </Switch>
        </div>
     </HashRouter>
     ) 
  }
}
 
export default Router;