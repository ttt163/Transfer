import { ADD_DATA,EDIT_LIST_DATA,EDIT_SELECTED_DATA} from './select.action'
export default function multiData(state = {"list":[],"chose":[],"selected":[],"minIndex":0}, action) {
    switch (action.type) {
        case ADD_DATA:
            var _data=action.data;
            return {...state,..._data};
        case EDIT_LIST_DATA:
            var _data=action.data,_list=state.list,_thisData=_list[action.index];
            _list=[
                ..._list.slice(0,action.index),
                {..._thisData,..._data},
                ..._list.slice(action.index+1)
            ];
            return {...state,"list":_list};
        case EDIT_SELECTED_DATA:
            var _data=action.data,_selected=state.selected,_thisData=_selected[action.index];
            _selected=[
                ..._selected.slice(0,action.index),
                {..._thisData,..._data},
                ..._selected.slice(action.index+1)
            ];
            return {...state,..._data};
        default:
            return state
    }
}