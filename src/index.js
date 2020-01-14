import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";

//routing 
import {BrowserRouter} from 'react-router-dom'

//redux
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import burgerReducer from './store/reducers/burgerReducer';
import orderReducer from './store/reducers/orderReducer'



//middleware
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({burger:burgerReducer, order:orderReducer});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const app = <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
