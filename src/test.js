import React,{Component} from 'react';
import { render } from 'react-dom';
import MutSelectItem from "./mutilSelect/select.index"
const data={
    "type":"业务",
    "company":"公司名称",
    "area":"故障区域",
    "isp":"客户接入运营商",
    "real_fault_cause1":"故障定位-真实",
    "real_out_same":"给客户的故障原因是否与真实故障原因不同",
    "tracer_id":"跟踪者"
};
let dataArr=[];
for(let [key,value] of Object.entries(data)){
    dataArr.push({"value":key,"name":value});
}
export default class Test extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div><MutSelectItem data={dataArr} /></div>
        )
    }
}

