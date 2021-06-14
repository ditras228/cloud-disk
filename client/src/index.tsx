import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/reducers";
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import ToastList from './components/toast/Toast'
ReactDOM.render(
    <Provider store={store}>
    <App />
    <ToastList/>

    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-ignore
reportWebVitals();
