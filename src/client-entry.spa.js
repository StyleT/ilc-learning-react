import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import singleSpaReact from 'single-spa-react';

const RootComponent = (props) => (<BrowserRouter basename={props.getCurrentBasePath()}><App/></BrowserRouter>);

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: RootComponent,
    renderType: 'hydrate',
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
export const unload = reactLifecycles.unload;
