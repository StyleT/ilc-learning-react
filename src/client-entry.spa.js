import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    renderType: 'hydrate',
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
export const unload = reactLifecycles.unload;
