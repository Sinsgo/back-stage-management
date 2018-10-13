import React,{ Component } from "react";
import {Form,Select,Card,DatePicker,Button,Table,message,Modal} from 'antd';
import './index.less';
import axios from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class OrderDemo extends Component { 
  constructor(props) {
    super(props);
  }
  state = {
    dataSource:[],
    pageSize:'',
    total:'',
    isLoading:false,
    endItem:{}
  };

  componentWillMount() {
    this.getTable()
  };

  params = {
    pn:1
  };
  //获取数据
  getTable = () =>{
    this.setState({
      isLoading:true
    })
      axios.get('./order/list',this.params).then(res=>{
      // console.log(res)
      if(res.code == 0){
        console.log(res.result.item_list)
        this.setState({
          dataSource:res.result.item_list.filter((item,index) => {
            if(index<5){
               item.key = index
              return item
            } else {
              return false
            }
           
          }),
          total: res.result.total_count, 
          isLoading:false
          })
      }
    })
    
  }
    



  //查询功能获取表单数据
  handleSearch = () => {
    console.log(this.props.form.getFieldsValue())
  }
  //重置表单数据
  sesetData = () => {
    this.props.form.resetFields	()
  }
  //结束订单（弹出确定框）
  handleDone = () => {
    let selectedItem = this.state.selectedItem
    if(selectedItem){
       axios.get('./order/ebike_info',{id:selectedItem[0].id}).then(res=>{
         console.log(res)
         this.setState({
           endItem:res.result,
           isVisible:true
         })
       })
    }else{
      message.info('请选择一项订单操作');
    }
  }
  //用户已经决定结束订单
  handleEnd = () =>{
    let id = this.state.selectedItem[0].id
    this.setState({
         isVisible: false
    })
    axios.get('./order/ebike_info',{id}).then(res=>{
      if(res.code == 0){
        message.success('结束订单成功')
        this.getTable()
      }
    })

  }
  订单详情
  handleDetail= ()=>{
     let item = this.state.selectedItem
    if(!item){
      message.info('请选择一项订单操作')
    }else{ 
      window.open(`/#/common/order_demo/details/${item[0].id}`,'_blank')
    }
  }

  render() { 
     const { getFieldDecorator } = this.props.form;
    const cityOptions = [
    {
      label:'北京',
      value:'0'
    },
    {
      label:'广州',
      value:'1'
    },
    {
      label:'河南',
      value:'2'
    }
  ]
  const orderStatus = [
    {
      label:'订单开始',
      value:'0'
    },
    {
      label:'订单结束',
      value:'1'
    },
    {
      label:'订单进行中',
      value:'2'
    }
  ]
     const columns =[
       {
         title:'订单编号',
         dataIndex:'order_sn',
         key:'order_sn'
       },
       {
         title:'车辆编号',
         dataIndex:'bike_sn',
         key:'bike_sn'
       },
       { 
         title:'用户名',
         dataIndex:'user_name',
         key:'user_name'
       },
       {
         title:'手机号',  
         dataIndex:'mobile',
         key:'mobile'
       },
       {
         title:'里程',
         dataIndex:'distance',
         render(distance){
           return distance/100 + 'Km';
         },
         key:'distance'
       },
       {
         title:'行驶时长',
         dataIndex:'total_time',
         key:'total_time'
       },
       {
         title:'状态',
         dataIndex:'status',
         key:'status'
       },
       {
         title:'结束时间',
         dataIndex:'end_time',
         key:'end_time'
       },
        {
         title:'开始时间',
         dataIndex:'start_time',
         key:'start_time'
       },
       {
         title:'订单金额',
         dataIndex:'total_fee',
         key:'total_fee'
       },
       {
         title:'实付金额',
         dataIndex:'user_pay',
         key:'user_pay'
       }
     ]
    
     const pagination = {
       total: this.state.total,
       pageSize: 5,
       onChange: (index) =>{
         this.params.pn = index
         this.getTable()
       }
     }
    const rowSelection ={
      type:'radio',
      selectedRowKeys:this.state.selectedIndex,
      onChange: (selectedRowKeys, selectedRows)=>{
        console.log(selectedRowKeys, selectedRows)

        this.setState({
          selectedItem:selectedRows,
          selectedIndex:selectedRowKeys
        })
      }
    }
    return ( 
      <div className="order-demo">
        <Card>
          <Form layout="inline">
            <FormItem label="城市">
              {
                getFieldDecorator('city',{initialValue:'1'})(
                  <Select style={{width:150}}  >
                    {cityOptions.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)}
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="订单时间">
                {
                getFieldDecorator('date')(
                  <RangePicker></RangePicker>
                )
              }
            </FormItem>
            <FormItem label="订单状态">
            {
                getFieldDecorator('order_status')(
                  <Select style={{width:200}}>
                  {orderStatus.map(item => 
                    <Option value={item.value} key={item.value}>{item.label}</Option>)}
              </Select>
                )
              }
            </FormItem>
          </Form>
           <div className="warp-btn">
                <Button type="primary" onClick={this.handleSearch}>查询</Button>
                <Button type="warning" onClick={this.sesetData} >重置</Button>
            </div>
         </Card>
         <Card style={{marginTop:'-1px'}}>
            <Button type="primary" className="mgr-20" onClick={this.handleDetail}>订单详情</Button>
            <Button  onClick={this.handleDone}>结束订单</Button>
         </Card>
         <Card >
            <Table columns={columns} 
                   pagination={pagination} 
                   dataSource={this.state.dataSource}
                   loading={this.state.isLoading}
                   rowSelection={rowSelection}>
            </Table>
         </Card>
        <Modal
          title="结束订单"
          visible={this.state.isVisible}
          onOk={this.handleEnd}
          onCancel={()=>this.setState({isVisible:false})}
        >
        <ul className="ul-data">
          <li>
              <span className="car-num li-title">车辆编号：</span>
              {this.state.endItem.bike_sn}
          </li>
          <li>
              <span className="car-num li-title">剩余电量：</span>
              {this.state.endItem.battery}
          </li>
          <li>
              <span className="car-num li-title">行程开始时间：</span>
              {this.state.endItem.start_time}
          </li>
          <li>
              <span className="car-num li-title">当前位置：</span>
              {this.state.endItem.location}
          </li>
        </ul>
        </Modal>
      </div>
     );
  }
}
 
export default Form.create()(OrderDemo);