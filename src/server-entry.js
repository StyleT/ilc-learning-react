import App from './app';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default function render() {
    return ReactDOMServer.renderToString(React.createElement(App));
}