const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const reactApp = require('./build/server').default;

// We need it to serve /client.js & /style.css
// cors() is necessary to get rid of the any CORS issues, suitable for development env only!
app.use('/public', cors(), express.static('build'), express.static('public'));

// TODO: uncomment code below:
// app.get('/microfrontend', (req, res) => {
//     let appProps = {};
//     try {
//         // More info here https://github.com/namecheap/ilc/blob/master/docs/ilc_app_interface.md#input-interface-ilc---app
//         appProps = JSON.parse(Buffer.from(req.query.routerProps, 'base64').toString('utf-8'));
//     } catch {
//         console.warn(`Can't fetch application props from ILC request`);
//     }
//     const publicPath = appProps.publicPath || '/public/';
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
<link rel="stylesheet" href="/public/style.css">
<div id="root">${reactApp()}</div>
<script src="/public/client.js"></script>
`));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);