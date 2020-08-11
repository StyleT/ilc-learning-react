import App from './App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

export default function render(url, context, basePath = '') {
    return ReactDOMServer.renderToString(
        <StaticRouter location={url} context={context} basename={basePath}>
            <App />
        </StaticRouter>
    );
}