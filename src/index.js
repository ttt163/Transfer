import React from 'react';
import { render } from 'react-dom'
//import { Router, Route, HashRouter,IndexRoute } from 'react-router';
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Test from "./test"
import {store} from './store.js'

let rootElement = document.getElementById('app');
render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/" component={Test}/>
        </HashRouter>
       {/* <Router history={hashHistory}>
            <Route path="/" component={Test}/>
        </Router>*/}
    </Provider>,
    rootElement
);
