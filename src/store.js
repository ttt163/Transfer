import root from './root.reducer.js';
//import thunk from "redux-thunk"
import { createStore,applyMiddleware } from 'redux';
export let store = createStore(root);
/*export const store = createStore(
    root,
    applyMiddleware(thunk)
);*/

