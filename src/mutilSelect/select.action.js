export const ADD_DATA="ADD_SELECT_DATA";
export const EDIT_LIST_DATA="EDIT_LIST_DATA";
export const EDIT_SELECTED_DATA="EDIT_SELECTED_DATA";
export function addSelectData(data){
    return { type: ADD_DATA,data}
}
export function editList(data,index){
    return { type: EDIT_LIST_DATA,data,index}
}
export function editSelected(data,index){
    return { type: EDIT_SELECTED_DATA,data,index}
}