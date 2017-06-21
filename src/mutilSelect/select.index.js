//import "../client.css"
import "./select.scss"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import {addSelectData, editList} from "./select.action"
class MutSelectItem extends Component {
    constructor(props) {
        super(props);
    }
//选择项
    selectItem(e, index, _data, isChk, dataType) {
        const {dispatch, chose, minIndex, multiData} = this.props;
        if (!e.shiftKey) {
            if (!e.ctrlKey) {
                //简单点击
                //dispatch(editList({"isChk": !isChk}, index));
                dispatch(addSelectData({"chose": [_data], "minIndex": index}));
            } else {
                //按下ctrl
                let _chose = chose;
                if (!isChk) {
                    //未被选中
                    _chose.push(_data);
                    dispatch(addSelectData({"chose": _chose, "minIndex": index}));
                } else {
                    //已经选中
                    let _i = _chose.findIndex((item) => {
                        return item.value == _data.value;
                    });
                    _chose = [..._chose.slice(0, _i),
                        ..._chose.slice(_i + 1),
                    ];
                    dispatch(addSelectData({"chose": _chose}));
                }
            }

        } else {
            //按下shift键
            let _thisData = multiData[dataType], _choseData = [];
            if (index > minIndex) {
                _choseData = _thisData.slice(minIndex, index + 1);
            } else {
                _choseData = _thisData.slice(index, minIndex + 1);
            }
            dispatch(addSelectData({"chose": _choseData}));

        }

    }
//数据操作
    confirmChose(actionType,dataType){
        const {dispatch, chose, minIndex, multiData} = this.props;
        let _data=multiData[dataType],otherType=(dataType=="list")?"selected":"list";
        if(actionType=="all"){
            dispatch(addSelectData({[dataType]:[],[otherType]:[...multiData[otherType],..._data]}));
        }else {
            let otherData=multiData[otherType],_otherData=[],_thisData=[..._data];
            for(let i=0;i<chose.length;i++){
                let _thisIndex=_thisData.findIndex((item)=>{
                    return item.value==chose[i].value;
                });
                if(_thisIndex!=-1){
                    _thisData=[
                        ..._thisData.slice(0,_thisIndex),
                        ..._thisData.slice(_thisIndex+1)
                    ];
                }
               /* for(let j=0;j<_thisData.length;j++){
                    if(_thisData[j].value==chose[i].value){
                        _thisData=[
                            ..._thisData.slice(0,j),
                            ..._thisData.slice(j+1)
                        ];
                        break;
                    }
                }*/
            }
            if(!otherData.length){
                _otherData=[...chose];
            }else{
                _otherData=[...chose];
                for(let i=0;i<_otherData.length;i++){
                    let _thisIndex=otherData.findIndex((item)=>{
                        return _otherData[i].value==item.value;
                    });
                    if(_thisIndex!=-1){
                        _otherData=[
                            ..._otherData.slice(0,i),
                            ..._otherData.slice(i+1)
                        ];
                    }
                   /* for(let j=0;j<otherData.length;j++){
                        if(otherData[j].value==_otherData[i].value){
                            _otherData=[
                                ..._otherData.slice(0,i),
                                ..._otherData.slice(i+1)
                            ];
                            break;
                        }
                    }*/
                }
            }
            dispatch(addSelectData({[dataType]:[..._thisData],[otherType]:[...otherData,..._otherData]}));
        }
    }
    //调整顺序
    sortItem(dir,type){
        const {dispatch,selectedChose,selected}=this.props;
        let selectedData=[];
        let _selectData=this.getItemData(selectedChose,selected),
            itemData=_selectData.data,
            maxIndex=_selectData.maxIndex,
            minIndex=_selectData.minIndex;
       // console.log(maxIndex);
        //console.log(minIndex);
       // return;
        if(dir=="up"){
            if(type=="top"){
                selectedData=[...selectedChose,...itemData];
            }else{
                if(minIndex>1){
                    selectedData=[
                        ...itemData.slice(0,minIndex-1),
                        ...selectedChose,
                        ...itemData.slice(minIndex-1)
                    ];
                }else{
                    selectedData=[...selectedChose,...itemData];
                }
            }
        }else{
            if(type=="bottom"){
                selectedData=[...itemData,...selectedChose];
            }else{
                if(maxIndex<itemData.length){
                    selectedData=[
                        ...itemData.slice(0,maxIndex+1),
                        ...selectedChose,
                        ...itemData.slice(maxIndex+1)
                    ];
                }else{
                    selectedData=[...itemData,...selectedChose];
                }
            }
        }
        dispatch(addSelectData({"selected":selectedData}));
    }
    getItemData(chose,itemData){
        let _selectedData=[...itemData],maxIndex=0,minIndex=itemData.length;
        chose.map((cItem)=>{
            let _thisIndex=_selectedData.findIndex((item)=>{
                return item.value==cItem.value;
            });
            if(_thisIndex!=-1){
                //_selectedData.push(cItem);
                console.log(_thisIndex);
                maxIndex=_thisIndex>maxIndex?_thisIndex:maxIndex;
                minIndex=_thisIndex<minIndex?_thisIndex:minIndex;
                _selectedData=[
                    ..._selectedData.slice(0,_thisIndex),
                    ..._selectedData.slice(_thisIndex+1)
                ]
            }
        });
        return {"data":_selectedData,"maxIndex":maxIndex,"minIndex":minIndex};
    }
    componentDidMount() {
        const {data, dispatch} = this.props;
        dispatch(addSelectData({"list": data}));

    }

    isSelectes(val, arr) {
        let flag = false;
        if (!arr.length) {
            return false;
        }
        for (let i = 0; i < arr.length; i++) {
            if (val == arr[i].value) {
                flag = true;
            }
        }
        return flag;
    }

    render() {
        const {list, chose, selected,selectedChose,listChose} = this.props;
        return (
            <div className="multi-block clear-fix">
                <div className="multi-items">
                    <div>备选列</div>
                    <ul onDoubleClick={()=>!listChose.length?"":this.confirmChose("chose","list")}>
                        {!list.length ? "" :
                            list.map((item, index) =>
                                <li key={index}>
                                    <a href="javascript:void(0)"
                                       className={!this.isSelectes(item.value, chose) ? "" : "select"}
                                       onClick={(e) => this.selectItem(e, index, {...item}, !this.isSelectes(item.value, chose) ? false : true, "list")}
                                    >{item.name}-{index}</a>
                                </li>
                            )
                        }

                    </ul>
                </div>
                <div className="multi-btns">
                    <div className="mbtn" onClick={()=>!listChose.length?"":this.confirmChose("chose","list")}><i className="iconfont">&#xe65d;</i></div>
                    <div className="mbtn" onClick={()=>!list.length?"":this.confirmChose("all","list")}><i className="iconfont">&#xe65e;</i></div>
                    <div className="mbtn" onClick={()=>!selectedChose.length?"":this.confirmChose("chose","selected")}><i className="iconfont">&#xe601;</i></div>
                    <div className="mbtn" onClick={()=>!selected.length?"":this.confirmChose("all","selected")}><i className="iconfont">&#xe65c;</i></div>
                </div>
                <div className="multi-items">
                    <div>已选列</div>
                    <ul onDoubleClick={()=>!selectedChose.length?"":this.confirmChose("chose","selected")}>
                        {!selected.length ? "" :
                            selected.map((item, index) =>
                                <li key={index}>
                                    <a href="javascript:void(0)"
                                       className={!this.isSelectes(item.value, chose) ? "" : "select"}
                                       onClick={(e) => this.selectItem(e, index, {...item}, !this.isSelectes(item.value, chose) ? false : true, "selected")}
                                    >{item.name}-{index}</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="multi-btns">
                    <div className="mbtn" onClick={()=>this.sortItem("up","top")}><i className="iconfont">&#xe65f;</i></div>
                    <div className="mbtn" onClick={()=>this.sortItem("up")}><i className="iconfont">&#xe661;</i></div>
                    <div className="mbtn" onClick={()=>this.sortItem("down")}><i className="iconfont">&#xe662;</i></div>
                    <div className="mbtn" onClick={()=>this.sortItem("down","bottom")}><i className="iconfont">&#xe660;</i></div>
                </div>
            </div>
        )
    }
}
function choseData(chose,itemData){
    let _selectedData=[];
    chose.map((cItem)=>{
        let _thisIndex=itemData.findIndex((item)=>{
            return item.value==cItem.value;
        });
        if(_thisIndex!=-1){
            _selectedData.push(cItem);
        }
    });
    return _selectedData;
}
function mapStateToProps(state) {
    console.log(state);
    return {
        "multiData": state.multiData,
        "list": state.multiData.list,
        "chose": state.multiData.chose,
        "selectedChose":choseData(state.multiData.chose,state.multiData.selected),
        "listChose":choseData(state.multiData.chose,state.multiData.list),
        "selected": state.multiData.selected,
        "minIndex": state.multiData.minIndex
    }
}
export default connect(mapStateToProps)(MutSelectItem)
/*
 点击哪一项就选择哪一项
 * 判断是否按下shift，e.shiftKey true/false
 * 如果按下shift，从已选择的初始下标到点击时的下标
 *判断是否按下ctrl，e.ctrlKey true/false
 * 如果按下ctrl,如果选中则取消，否则选中
 * 同时按下shift和ctrl，以shift为主
 * list[],chose[],selected[],index,id,name
 * */

