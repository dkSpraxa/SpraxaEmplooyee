import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from './redux/store';
import AlertTemplate from "react-alert-template-basic"
import {Provider as AlertProvider,transitions,positions} from "react-alert"

const options = {
  position:positions.BOTTOM_CENTER,
  timeout:5000,
  offset:'10px',
  transition:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>
  </BrowserRouter>
);


