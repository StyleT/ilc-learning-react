const express = require('express');
const app = express();
const port = 5000;
const reactApp = require('./build/server').default;

app.use(express.static('build')); // We need it to serve /client.js
app.use(express.static('public')); // We need it to serve /style.css

// TODO: uncomment code below:
// app.get('/microfrontend', (req, res) => {
//     let appProps = {};
//     try {
//         // More info here https://github.com/namecheap/ilc/blob/master/docs/ilc_app_interface.md#input-interface-ilc---app
//         appProps = JSON.parse(Buffer.from(req.query.routerProps, 'base64').toString('utf-8'));
//     } catch {
//         console.warn(`Can't fetch application props from ILC request`);
//     }
//     const publicPath = appProps.publicPath || '/';
//
//     // More info: https://github.com/namecheap/ilc/blob/master/docs/ilc_app_interface.md#response-interface-app---ilc
//     res.append('Link', [
//         `<${publicPath}style.css>; rel="stylesheet"`,
//         `<${publicPath}client.js>; rel="fragment-script"`
//     ].join(', '));
//
//     res.send(`<div class="app-container">${reactApp()}</div>`)
// });

app.get('/', (req, res) => res.send(`
<link rel="stylesheet" href="/style.css">
<div id="root">${reactApp()}</div>
<script src="/client.js"></script>
`));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);