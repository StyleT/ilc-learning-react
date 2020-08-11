import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const RootComponent = () => (<BrowserRouter><App/></BrowserRouter>);

ReactDOM.render(React.createElement(RootComponent), document.getElementById("root"));